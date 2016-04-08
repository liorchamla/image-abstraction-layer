# FCC Basejump API : Images Abstraction Layer
By Lior Chamla

# User stories:
> 1. I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
> 2. I can paginate through the responses by adding a ?offset=2 parameter to the URL.
> 3. I can get a list of the most recently submitted search strings.

# Example usage:
```
https://image-abstraction-layer-liorchamla.c9users.io/search/kitten%20sleeping
https://image-abstraction-layer-liorchamla.c9users.io/search/kitten%20sleeping?offset=3
```

# Example output:
```
[
    {
      "type": "image/jpeg",
      "width": 320,
      "height": 240,
      "size": 4819,
      "url": "http://s2.dmcdn.net/gQVS/x240-8Qp.jpg",
      "thumbnail": {
        "url": "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRdI1jMdjH0rJqPTiyx-2HtsTfOcpsgpdK-h6IybyGEGv6GqtJOta9Lcg",
        "width": 118,
        "height": 89
      }
    },
    {
      "type": "image/jpeg",
      "width": 480,
      "height": 360,
      "size": 11158,
      "url": "https://i.ytimg.com/vi/C2q6oeDod54/hqdefault.jpg",
      "thumbnail": {
        "url": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQOMGVk7cH8VGDhu0JelMA9y2EhDfrK5-aU_GoeSsljLPphB_xeqT_v8qg",
        "width": 129,
        "height": 97
      }
    },
    {
      "type": "image/jpeg",
      "width": 427,
      "height": 240,
      "size": 17835,
      "url": "http://s2.dmcdn.net/NIXy8/x240-0gO.jpg",
      "thumbnail": {
        "url": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcReGifA-OI3XMNYtFfn80Cb4Xh4E4gbinwz1OLzsSVNHJcA8DbKuv9bBA",
        "width": 126,
        "height": 71
      }
    }
]
```
# Example usage for latest queries:</h3>
```
https://image-abstraction-layer-liorchamla.c9users.io/latest
```
# Example output:
```
  [
    {
      "term": "toto le chat",
      "date": "2016-04-08T06:30:12.154Z"
    },
    {
      "term": "toto le chat",
      "date": "2016-04-08T06:30:29.842Z"
    },
    {
      "term": "toto le chat",
      "date": "2016-04-08T06:30:48.002Z"
    },
    {
      "term": "toto le chat",
      "date": "2016-04-08T06:31:49.159Z"
    },
    {
      "term": "toto le chat",
      "date": "2016-04-08T06:32:14.384Z"
    },
    {
      "term": "toto le chat",
      "date": "2016-04-08T06:35:56.970Z",
      "offset": "2"
    },
    {
      "term": "jbox web",
      "date": "2016-04-08T06:47:35.058Z"
    },
    {
      "term": "lior chamla",
      "date": "2016-04-08T06:47:43.479Z"
    }
  ]
```
        