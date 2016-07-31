require('normalize.css/normalize.css');
require('styles/main.scss');
//require('styles/App.css');

import React from 'react';

//获取图片相关数据
let imageDatas = require('../data/imageDatas.json');
let yeomanImage = require('../images/yeoman.png');

// 利用自执行函数，将图片名转成图片URL路径信息
imageDatas = (function genImageURL(imageDataArr){
   for (let i = 0,  j = imageDataArr.length; i < j; i++){
     let sinleImageData = imageDataArr[i];
     sinleImageData.imageURL = require('../images/' + sinleImageData.fileName);
     imageDataArr[i] = sinleImageData;
   }
   return imageDataArr;
 })(imageDatas)

class ImgFigure extends React.Component{
  render() {
    return(
      <figure className="img-figure">
        <img src={this.props.data.imageURL}
             alt={this.props.data.title} />
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>
    )
  }
}

class GalleryByReactAPP extends React.Component {
  render() {
    let contorllerUnits = [],
        imgFigures      = [];
        imageDatas.forEach(function(value){
          imgFigures.push(<ImgFigure data={value} />)
        });
    return (
      <section className="stage">
        <section class="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
          {contorllerUnits}
        </nav>
      </section>
    );
  }
}

GalleryByReactAPP.defaultProps = {};

export default GalleryByReactAPP;
