require('normalize.css/normalize.css');
require('styles/main.scss');
//require('styles/App.css');

import React from 'react';

//获取图片相关数据
let imageDatas = require('../data/imageDatas.json');
let yeomanImage = require('../images/yeoman.png');

// 利用自执行函数，将图片名转成图片URL路径信息
imageDatas = (function genImageURL(imageDataArr){
   for (var i = 0,  j = imageDataArr.length; i < j; i++){
     var sinleImageData = imageDataArr[i];
     sinleImageData.imageURL = require('../images/' + sinleImageData.fileName);
     imageDataArr[i] = sinleImageData;
   }
   return imageDataArr;
 })(imageDatas)
console.log(imageDatas)
//imageDatas = genImageURL(imageDatas)


class GalleryByReactAPP extends React.Component {
  render() {
    return (
      <section className="stage">
        <section class="img-sec">

        </section>
        <nav className="controller-nav">

        </nav>
      </section>
    );
  }
}

GalleryByReactAPP.defaultProps = {
};

export default GalleryByReactAPP;
