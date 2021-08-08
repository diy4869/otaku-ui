import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Input from '@lib/input/input'
import Avatar from '@lib/avatar/avatar'
import Comment from '@lib/comment/comment'
import Button from '@lib/button/button'
import SpaceBetween from '@lib/spaceBetween/spaceBetween'
import Rate from '@lib/rate/rate'
import Bangumi from '~/img/miao.png'
import playerStyle from './player.module.scss'

export default function Player () {
  let [collection, setCollection] = useState(false)
  const [quarter] = useState([
    {
      id: 1,
      name: '第一季'
    },
    {
      id: 2,
      name: '第二季'
    },{
      id: 3,
      name: '第三季'
    }
  ])
  const [currentQuarter, setCurrentQuarter] = useState(1)
  const [currentEpisode, setCurrentEpisode] = useState(1)
  const [Episode] = useState([])

  const history = useHistory()
  const CollectionBangumi = () => {
    collection = !collection
    setCollection(collection)
  }

  const toDetail = (id: number): void => {
    history.push(`/bangumiDetail?id=${id}`)
  }

  const switchQuarter = (id: number) => {
    setCurrentQuarter(id)
  }

  const switchEpisode = (id: number) => {
    setCurrentEpisode(id)
  }

  return (
    <div className={playerStyle.player}>
        <div className={playerStyle.top}>
          <aside className={playerStyle.playerBox}></aside>
          <aside className={playerStyle.right}>
            <section>
              <div className={playerStyle.quarter}>
                {
                  quarter.map((item, index) => {
                    return (
                      <span 
                        key={index}
                        onClick={() => switchQuarter(index + 1)}
                        className={index + 1 === currentQuarter ? playerStyle.active : ''}>
                        {item.name}
                      </span>
                    )
                  })
                }
              </div>
              <ul className={playerStyle.episode}>
                {
                  new Array(20).fill('').map((item, index) => {
                    return (
                      <li 
                        key={index}
                        onClick={() => switchEpisode(index + 1)}
                        className={index + 1 === currentEpisode ? playerStyle.episodeActive : ''}>
                        {index + 1}
                      </li>
                    )
                  })
                }
              </ul>
            </section>
          </aside>
        </div>
        <div className={playerStyle.bottom}>
          <div className={playerStyle.detail}>
            <div className={playerStyle.cover}>
              <img src={Bangumi} alt=""/>
            </div>
            <div className={playerStyle.detailRight}>
              <SpaceBetween
                left={
                  <h2>鬼灭之刃</h2>
                }
                right={
                  <div className={playerStyle.detailButon}>
                    <Button color="#f7f8f9" size="mini">
                      <Rate score={9.5} size={17} showScore></Rate>
                    </Button>
                    <div style={{marginRight: '10px'}}></div>
                    <Button type="primary" color="#ff6b6b" size="small" icon="heart">
                      追番
                    </Button>
                  </div>
                }></SpaceBetween>
              <div>
                <span  style={{marginRight: '10px', color: '#999999'}}>全26话</span>
                <span>连载中</span>
              </div>
              <p className={playerStyle.desc}>大正时期，日本。心地善良的卖炭少年·炭治郎，有一天他的家人被鬼杀死了。而唯一幸存下来的妹妹——祢豆子变成了鬼。被绝望的现实打垮的炭治郎，为了寻找让妹妹变回人类的方法，决心朝着“鬼杀队”的道路前进。人与鬼交织的悲哀的兄妹的故事，现在开始！</p>
            </div>
          </div>
          <div className={playerStyle.releaseComment}>
            <div className={playerStyle.addComment}>
              <div className={playerStyle.avatar}>
                <Avatar size={35}></Avatar>
              </div>
              <div className={playerStyle.textarea}>
                <Input 
                  className={playerStyle.textarea}
                  type="textarea" 
                  placeholder="发个评论看看？"
                  bgcolor="#f7f8f9" 
                  border={false}
                  rows={5}></Input>
              </div>
            </div>
            <div className={playerStyle.end}>
              <Button type="primary" color="#3064ff">发布</Button>
            </div>
          </div>
          <div className={playerStyle.commentCotainer}>
            <Comment>
              <Comment></Comment>
              <Comment reply replyUser="last"></Comment>
            </Comment>
          </div>
        </div>
        {/* <Row className={playerStyle.bottom}>
          <Col span={18} className={playerStyle.recommend}>
            <h2>相关推荐</h2>
            <Row className={playerStyle.list} gutter={[16, 20]}>
                {
                  Array(12).fill('').map((item, index) => {
                    return (
                      <Col key={index} xxl={4} sm={6}  xs={8} className={playerStyle.listItem}>
                        <img src={Bangumi} alt="" onClick={() => toDetail(index)}/>
                        <span>如果历史是一群喵</span>
                        <span className={index % 2 !== 0 ? playerStyle.new : ''}>更新至第20集</span>
                      </Col>
                    )
                  })
                }
              </Row>
          </Col>
          <Col span={6} className={playerStyle.bangumiDetail}>
            <h2>番剧详情</h2>
            <ul>
              <li className={playerStyle.title}>如果历史是一群喵</li>
              <li>
                <div className={playerStyle.update}>
                  <span>更新至第20集</span>
                  <span 
                    onClick={CollectionBangumi}
                    className={`icon iconfont ${collection ? 'b-icon-heart' : 'b-icon-heart-fill'} ${playerStyle.collection}`}>
                  </span>
                </div>
              </li>
              <li>
                <span>原名：</span>
                <span>如果历史是一群喵</span>
              </li>
              <li>
                <span>标签：</span>
                <div className="tag">
                  <span></span>
                  <span></span>
                </div>
              </li>
              <li>
                <span>评级：</span>
                <span>PG13 13岁以下需陪同</span>
              </li>
              <li>
                <span>开播：</span>
                <span>2018年9月2日</span>
              </li>
              
              <li>
                <span>更新状态：</span>
                <span>暂无</span>
              </li>
              <li>
                <span>制作公司：</span>
                <span>暂无</span>
              </li>
              <li>
                <h3>简介：</h3>
                <span className={playerStyle.desc}>《如果历史是一群喵》是一部以华夏历史为主线的非严谨萌系动画，作品以风趣幽默的语言对 历史事件进行了重新解读，更容易为年轻人记忆和接受。在表达上，作品用现代动画的手法塑 造了12只体态丰盈、造型可爱的猫咪，用它们把历史事件演绎成了精彩的历史故事。该剧不但响应了中央关于“弘扬中华优秀传统文化”的号召，还是文化创新和“寓教于乐”的一次新探索和尝试。</span>
              </li>
            </ul>
          </Col>
        </Row>
        <section className={playerStyle.bottom}>
          <section className={playerStyle.recommend}>
            
          </section>
          <section className={playerStyle.bangumiDetail}>
            
          </section>
        </section>*/}
      </div> 
  )
}
