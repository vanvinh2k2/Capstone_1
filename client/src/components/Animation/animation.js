// let container = document.getElementById('container');
// let blurarr = ['0', '5px'];
// let borderarr = ['50%', '0'];
// let colorarr = ['#2be246', '#ff0000', '#ffff00'];
// let width = /*document.documentElement.clientWidth*/ window.innerWidth;
// let height = /*document.documentElement.clientHeight*/ window.innerHeight;
// let count = 450;

// function createAnimation(){
//     for(let i=0;i<count;i++){
//         let randomLeft = Math.floor(Math.random()*width);
//         let randomTop = Math.floor(Math.random()*height);
//         var color = Math.floor(Math.random()*3);
//         let widthElement = Math.floor((Math.random()*5)+5);
//         let td = Math.floor(Math.random()*2);
//         let td2 = Math.floor(Math.random()*2);
//         let time = Math.floor(Math.random()*15)+6;

//         let div = document.createElement('div');
//         div.style.backgroundColor = colorarr[color];
//         div.style.width = widthElement +'px';
//         div.style.height = widthElement + 'px';
//         div.style.position = 'absolute';
//         div.style.marginLeft = randomLeft + 'px';
//         div.style.marginTop = randomTop + 'px';
//         div.style.borderRadius = borderarr[td];
//         div.style.filter = 'blur('+blurarr[td2]+')';
//         div.style.animation = 'anima '+time+'s ease infinite';
//         container.appendChild(div);
        
//     }
// }

// createAnimation();

import React, { Component, useEffect, useState } from 'react';

class Animation extends Component {
  componentDidMount() {
    this.createAnimation();
  }

  createAnimation() {
    const container = document.getElementById('container');
    const blurarr = ['0', '5px'];
    const borderarr = ['50%', '0'];
    const colorarr = ['#2be246', '#ff0000', '#ffff00'];
    const width = window.innerWidth;
    const height = window.innerHeight;
    const count = 300;

    for (let i = 0; i < count; i++) {
      const randomLeft = Math.floor(Math.random() * width);
      const randomTop = Math.floor(Math.random() * height);
      const color = Math.floor(Math.random() * 3);
      const widthElement = Math.floor(Math.random() * 5) + 5;
      const td = Math.floor(Math.random() * 2);
      const td2 = Math.floor(Math.random() * 2);
      const time = Math.floor(Math.random() * 15) + 6;

      const div = document.createElement('div');
      div.style.backgroundColor = colorarr[color];
      div.style.width = widthElement + 'px';
      div.style.height = widthElement + 'px';
      div.style.position = 'absolute';
      div.style.marginLeft = randomLeft + 'px';
      div.style.marginTop = randomTop + 'px';
      div.style.borderRadius = borderarr[td];
      div.style.filter = 'blur(' + blurarr[td2] + ')';
      div.style.animation = 'anima ' + time + 's ease infinite';
      container.appendChild(div);
    }
  }

  render() {
    return (
      <div id="container" 
      style={{ position: 'fixed', width: '100vw', height: '100vh', top: '0', left: '0', right: '0', zIndex: '-1' }}>
      </div>
    );
  }
}

export default Animation;