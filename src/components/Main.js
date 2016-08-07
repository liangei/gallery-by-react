require('normalize.css/normalize.css');
require('styles/main.scss');
//require('styles/App.css');

import React from 'react';
import ReactDOM from 'react-dom';

//获取图片相关数据
let imageDatas = require('../data/imageDatas.json');

// 利用自执行函数，将图片名转成图片URL路径信息
imageDatas = (function genImageURL(imageDataArr){
   for (let i = 0,  j = imageDataArr.length; i < j; i++){
     let sinleImageData = imageDataArr[i];
     sinleImageData.imageURL = require('../images/' + sinleImageData.fileName);
     imageDataArr[i] = sinleImageData;
   }
   return imageDataArr;
 })(imageDatas)


/*
* 获取一个敬意的随机值
* @param min,max最小最大
*/
function getRangeRandom(min, max){
  return Math.ceil( Math.random() * (max - min) + min)
}
 /*
  *生成一个正负30之间的随机值
  */
function get30RangeRandom(){

  return ((Math.random() > 0.5 ? '' : '-' )+Math.ceil(Math.random() * 30))

}


class ImageFigure extends React.Component{

  handleClick(e) {

    if(this.props.arrange.isCenter){
      this.props.inverse();
    }else{
      this.props.center();
    }
    e.stopPropagation();
    e.preventDefault();
  }

  render() {

    let styleOBJ = {};
    if(this.props.arrange.pos){
      styleOBJ = this.props.arrange.pos
    }
    if(this.props.arrange.rotate){
      ['Webkit', 'O', 'Moz', 'Mz', ''].forEach((v)=>{
        styleOBJ[v+'transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)'
      })
    }
    if(this.props.arrange.isCenter){
      styleOBJ.zIndex  = 11
    }
    let imgFigureClass = 'img-figure';
        imgFigureClass += this.props.arrange.isInverse ? ' is-inverse':'';


    return(
      <figure className={imgFigureClass} style={styleOBJ} onClick={this.handleClick.bind(this)}>
        <img src={this.props.data.imageURL}
             alt={this.props.data.fileName}/>
        <figcaption>
           <h2 className="img-title">{this.props.data.title}</h2>
          <div className="img-back" onClick={this.handleClick.bind(this)}>
            <p>{this.props.data.decs}</p>
          </div>
        </figcaption>
      </figure>
    )
  }
}

class ContorllerUnit extends React.Component{

  handleClick(e) {


    if(this.props.arrange.isCenter){
      this.props.inverse();
    }else{
      this.props.center();
    }

    e.stopPropagation();
    e.preventDefault();
  }

  render() {
    let contorllerInitClass = 'contorller-init';
    if(this.props.arrange.isCenter){
      contorllerInitClass += ' is-center'

      if(this.props.arrange.isInverse){
        contorllerInitClass += ' is-inverse'
      }
    }
    return(
      <span className={contorllerInitClass} onClick={this.handleClick.bind(this)}></span>
    )
  }
}



class GalleryByReactAPP extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        imgsArrangeArr:[

        ]
      };
    }
    Cantant = {
      centerPos: { //中心位置取值范围
          left:0,
          top:0
        },
      hPosRange: { //水平方向的取值范围
        leftSecX:[0, 0],
        rightSecX:[0, 0],
        y:[0, 0]
        },
      vPosRange: { //垂直方向的取值范围
        x:[0, 0],
        topY:[0, 0]
        }
    };

  /*
   *翻转图片
   * @param 输入当前被执行图片数组的index信息
   * return {function}
   */
    inverse(index) {
      return () => {
        let imgsArrangeArr = this.state.imgsArrangeArr;
        imgsArrangeArr[index].isInverse =!imgsArrangeArr[index].isInverse;

        this.setState({
          imgsArrangeArr:imgsArrangeArr
        })
      }
    }

    /*
     *
     */
    center(index) {
        return () => {
          this.rearrange(index)
        }
    }

    /*
     *@param centerIndex 指定居中排布哪个图片
     */
    rearrange(centerIndex) {
        let imgsArrangeArr = this.state.imgsArrangeArr,
            Cantant = this.Cantant,
            centerPos = Cantant.centerPos,
            hPosRange = Cantant.hPosRange,
            vPosRange = Cantant.vPosRange,
            hLeftSecX = hPosRange.leftSecX,
            hRightSecX= hPosRange.rightSecX,
            hPosRangeY= hPosRange.y,
            vPosRangeX =vPosRange.x,
            vposRangeTopY= vPosRange.topY,

            imgsArrangeTopArr = [],
            topImgNum = Math.floor( Math.random() * 2 ),//取0-1个图片
            topImgSpliceIndex = 0,

            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

            //排布中间图片
            imgsArrangeCenterArr[0] = {
              pos:centerPos,
              rotate:0,
              isCenter:true
            }

            //排布上顶图片
            topImgSpliceIndex = Math.ceil( Math.random() * (imgsArrangeArr.length - topImgNum)) ;
            imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum );

            imgsArrangeTopArr.forEach( (v,i)=>{
              imgsArrangeTopArr[i] = {
                  pos:{
                    top: getRangeRandom(vposRangeTopY[0], vposRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                  },
                 rotate:get30RangeRandom(),
                 isCenter:false

              }
            })

            //排布左右区域图片
            for(let i = 0, j = imgsArrangeArr.length, k = j /2; i < j; i++ ){
                let hRangeLORX = null;

                if( i < k ){
                  hRangeLORX = hLeftSecX;
                }else{
                  hRangeLORX = hRightSecX;
                }
              imgsArrangeArr[i] ={
                pos : {
                  top:getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                  left: getRangeRandom(hRangeLORX[0], hRangeLORX[1] )
                },
                rotate:get30RangeRandom(),
                isCenter:false
              }
            }

           //重新组合图片数组
            if(imgsArrangeTopArr && imgsArrangeTopArr[0]) {
              imgsArrangeArr.splice( topImgSpliceIndex , 0 , imgsArrangeTopArr[0])
            }

             imgsArrangeArr.splice( centerIndex, 0 , imgsArrangeCenterArr[0] )

            this.setState({
              imgsArrangeArr:imgsArrangeArr
            })



    }


    //组件加载后，为每张图片计算可取值范围
    componentDidMount() {

      //获取舞台的大小
      let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
          stageW = stageDOM.scrollWidth,
          stageH = stageDOM.scrollHeight,
          halfStageW = Math.ceil(stageW / 2),
          halfStageH = Math.ceil(stageH / 2);

      //获取第一个imageFigure的大小
      let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
          imgW = imgFigureDOM.scrollWidth,
          imgH = imgFigureDOM.scrollHeight,
          halfImgW = Math.ceil(imgW / 2),
          halfImgH = Math.ceil(imgH / 2);


      //计算中心图片的位置点
      this.Cantant.centerPos = {
          left: halfStageW - halfImgW,
          top: halfStageH - halfImgH
      };

      //计算左右区域图片排布取值范围
      this.Cantant.hPosRange.leftSecX[0] = -halfImgW;
      this.Cantant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 4;
      this.Cantant.hPosRange.rightSecX[0] = halfStageW + halfImgW * 2;
      this.Cantant.hPosRange.rightSecX[1] = stageW - halfImgW;
      this.Cantant.hPosRange.y[0] = -halfImgH;
      this.Cantant.hPosRange.y[1] = stageH - halfImgH;

      //计算上侧区域图片排布取值范围
      this.Cantant.vPosRange.topY[0] = -halfImgH;
      this.Cantant.vPosRange.topY[0] = halfStageH - halfImgH / 2 * 7;
      this.Cantant.vPosRange.x[0] = halfStageW - imgW;
      this.Cantant.vPosRange.x[1] = halfStageW;

      this.rearrange(0)
  }

  render() {
      let imageFigures = [],
          contorllerUnits = [];

      imageDatas.forEach( (v, i)=>{

        if(!this.state.imgsArrangeArr[i]){
          this.state.imgsArrangeArr[i] = {
            pos: {
              top: 0,
              left: 0
            },
            rotate:0,
            isInverse:false,
            isCenter:false
          }
        }

        imageFigures.push(<ImageFigure
                 key={i}
                 ref={'imgFigure'+i}
                 data={v}
                 arrange={this.state.imgsArrangeArr[i]}
                 inverse={this.inverse(i)}
                 center={this.center(i)}/>);
        contorllerUnits.push(<ContorllerUnit
                 key={i}
                 arrange={this.state.imgsArrangeArr[i]}
                 inverse={this.inverse(i)}
                 center={this.center(i)}/>);

      })
    return (
      <section className="stage" ref="stage">
        <section className="img-sec">
         {imageFigures}
        </section>
        <nav className="contorllter-nav">
          {contorllerUnits}
        </nav>
      </section>
    );
  }
}

GalleryByReactAPP.defaultProps = {};

export default GalleryByReactAPP;
