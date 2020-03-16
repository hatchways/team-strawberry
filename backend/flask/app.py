from operator import itemgetter
from flask import Flask, jsonify, request
import requests
import json
from functools import wraps

app = Flask(__name__)

cache = {}


def cache_middleware():
    def wraps_func(f):
        @wraps(f)
        def middleware(*args, **kwargs):
            cache_key = request.full_path
            if cache_key in cache:
                return cache[cache_key], 200
            else:
                return f(*args, **kwargs)
        return middleware
    return wraps_func


@app.route('/api/posts', methods=['GET'])
@cache_middleware()
def posts():
    results = []
    for tag in req.args['tags'].split(','):
        res = requests.get("https://hatchways.io/api/assessment/blog/posts?tag={}".format(tag))
        results.append(res.json()['posts'])

    results = [json.loads(a) for a in set(json.dumps(post for posts in results for post in posts))]

    if request.args['sortBy'] == 'id':
        results = sorted(results,
                         key=itemgetter('id'),
                         reverse=request.args['direction'] == 'asc')
    elif request.args['sortBy'] == 'reads':
        results = sorted(results,
                         key=itemgetter('reads'),
                         reverse=request.args['direction'] == 'asc')
    elif request.args['sortBy'] == 'popularity':
        results = sorted(results,
                         key=itemgetter('popularity'),
                         reverse=request.args['direction'] == 'asc')
    elif request.args['sortBy'] == 'likes':
        results = sorted(results,
                         key=itemgetter('likes'),
                         reverse=request.args['direction'] == 'asc')

    return jsonify({'posts': results}), 200


VALID_SORT_BYS = {
    "id": True,
    "reads": True,
    "popularity": True,
    "likes": True
}
# Sorting logic in process_posts() always sorts in ascending order.
# So the boolean values correspond to whether we should reverse it or not.
VALID_DIRECTIONS = {
    "desc": True,
    "asc": False
}

if __name__ == '__main__':
    app.run()
