# [Labellab Components](https://labellab.io/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/kev71187/labellab-components/blob/master/LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/kev71187/labellab-components/pulls)

Labellab Components is a JavaScript library for providing a ui to label images, text, video, audio.

* **Unified UI and labels:** Labellab Components makes it painless to generate labeled datasets.

## Documentation

You can find the Labellab Components documentation [on the website](https://components.labellab.io).

## Contributing

The main purpose of this repository is to continue to evolve how we label Datasets, making it faster and easier to use.

### Current Feature Set
* Text - document classification
* Image - document classification, box tool, polygon tool

### Screenshots
* Classify Images
<p/>
<img height="300px" src="https://github.com/kev71187/labellab-components/raw/master/assets/classify-labeler.png"/>&emsp;<img height="300px" src="https://github.com/kev71187/labellab-components/raw/master/assets/classify-preview.png"/>

```javascript
  <Labeler
    url="https://www.hakaimagazine.com/wp-content/uploads/header-bald-eagle-nests.jpg"
    fileType="image"
    labelChoices={["bug","whale","bird","dog","cat","human"]}
    onComplete={(labels) => {
      console.log(labels)
    }}
  />
```

* Box and Classify Images
<p/>
<img height="300px" src="https://github.com/kev71187/labellab-components/raw/master/assets/box-labeler.png"/>&emsp;<img height="300px" src="https://github.com/kev71187/labellab-components/raw/master/assets/box-preview.png"/>

```javascript
  <Labeler
    url="http://www.nba.com/media/history/chamberlain_reb_200.jpg"
    fileType="image"
    labelGeometry="box"
    labelChoices={["basketball","head","foot","arm","body"]}
    onComplete={(labels) => {
      console.log(labels)
    }}
  />
```

* Polygon and Classify Images
<p/>
<img height="300px" src="https://github.com/kev71187/labellab-components/raw/master/assets/polygon-labeler.png"/>&emsp;<img height="300px" src="https://github.com/kev71187/labellab-components/raw/master/assets/polygon-preview.png"/>

```javascript
  <Labeler
    url="https://images.pond5.com/girl-driving-motorcycles-first-person-footage-084718933_prevstill.jpeg"
    fileType="image"
    labelGeometry="polygon"
    labelChoices={["car","motorcycle","road","person","body","stopped","outbound","inbound"]}
    onComplete={(labels) => {
      console.log(labels)
    }}
  />
```

### Roadmap of Features
* Text - word classification
* Audio - time series classification
* Video - time series classification, polygon tool for frames

### License

Labellab Components is [MIT licensed](./LICENSE).

