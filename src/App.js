import './index.css'
import avatar from './images/avatar.png'
import React from 'react'
import {v4 as uuid} from 'uuid'

// 时间格式化
function formatDate (time) {
  return `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()}`
}

class App extends React.Component {
  state = {
    // hot: 热度排序  time: 时间排序
    tabs: [
      {
        id: 1,
        name: '热度',
        type: 'hot'
      },
      {
        id: 2,
        name: '时间',
        type: 'time'
      }
    ],
    active: 'hot',
    list: [
      {
        id: 1,
        author: '刘德华',
        comment: '给我一杯忘情水',
        time: new Date('2021-10-10 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 1
      },
      {
        id: 2,
        author: '周杰伦',
        comment: '哎哟，不错哦',
        time: new Date('2021-10-11 09:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: 0
      },
      {
        id: 3,
        author: '五月天',
        comment: '不打扰，是我的温柔',
        time: new Date('2021-10-11 10:09:00'),
        // 1: 点赞 0：无态度 -1:踩
        attitude: -1
      }
    ],
    comment:''
  }
  switchSort=(type)=>{
    this.setState({
      active: type
    })
  }
  like=(curItem)=>{
    console.log(curItem)
    const {attitude,id} = curItem
    this.setState({
      list: this.state.list.map(item=>{
        if(item.id===id){
          return {
            ...item,
            attitude: attitude===1?0:1
        }
       } else{
          return item
        }
      })
    })
  }
  hate=(curItem)=>{
    console.log(curItem)
    const {attitude,id} = curItem
    this.setState({
      list: this.state.list.map(item=>{
        if(item.id===id){
          return{
            ...item,
            attitude:attitude===-1?0:-1
        }
      }else{
        return item
      }
      })
    })
  }
  changeText=(e)=>{
    // console.log(e)
    this.setState({
      comment: e.target.value
    })
  }
  delete=(id)=>{
    this.setState({
      list: this.state.list.filter(item=>item.id!==id)
    })
  }
  submit=(comment)=>{
    this.setState({
      list: [
              ...this.state.list,
              {
                id: uuid(),
                author: '刘德华',
                comment: comment,
                time: new Date('2021-10-10 09:09:00'),
                // 1: 点赞 0：无态度 -1:踩
                attitude: 1
              },
            ]
    })
  }
  render () {
    return (
      <div className="App">
        <div className="comment-container">
          {/* 评论数 */}
          <div className="comment-head">
            <span>{this.state.list.length} 评论</span>
          </div>
          {/* 排序 */}
          <div className="tabs-order">
            <ul className="sort-container">
              {
                this.state.tabs.map(tab => (
                  <li 
                    onClick={()=>this.switchSort(tab.type)}
                    key={tab.id}
                    className={tab.type === this.state.active ? 'on' : ''}
                  >按{tab.name}排序</li>
                ))
              }
            </ul>
          </div>

          {/* 添加评论 */}
          <div className="comment-send">
            <div className="user-face">
              <img className="user-head" src={avatar} alt="" />
            </div>
            <div className="textarea-container">
              <textarea
                cols="80"
                rows="5"
                placeholder="发条友善的评论"
                className="ipt-txt"
                value={this.state.comment}
                onChange={this.changeText}
              />
              <button onClick={()=>this.submit(this.state.comment)} className="comment-submit">发表评论</button>
            </div>
            <div className="comment-emoji">
              <i className="face"></i>
              <span className="text">表情</span>
            </div>
          </div>

          {/* 评论列表 */}
          <div className="comment-list">
            {
              this.state.list.map(item => (
                <div className="list-item" key={item.id}>
                  <div className="user-face">
                    <img className="user-head" src={avatar} alt="" />
                  </div>
                  <div className="comment">
                    <div className="user">{item.author}</div>
                    <p className="text">{item.comment}</p>
                    <div className="info">
                      <span className="time">{formatDate(item.time)}</span>
                      <span onClick={()=>this.like(item)} className={item.attitude === 1 ? 'like liked' : 'like'}>
                        <i className="icon" />
                      </span>
                      <span onClick={()=>this.hate(item)} className={item.attitude === -1 ? 'hate hated' : 'hate'}>
                        <i className="icon" />
                      </span>
                      <span onClick={()=>this.delete(item.id)} className="reply btn-hover">删除</span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>)
  }
}


export default App
