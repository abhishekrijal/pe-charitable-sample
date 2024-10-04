import React, { useState } from 'react';
import { Col, Row, Typography } from 'antd';

import {
  DownOutlined,
  ChromeFilled
} from '@ant-design/icons';

import './AndroidChrome.scss';

const { Text, Paragraph } = Typography;
const AndroidChrome = (props) => {
  const [isOpen, setIsOpen] = useState(!!props.big_image);
  const hasActionBtn =
    (props.btn1 && props.btn1.title.length > 0) || (props.btn2 && props.btn2?.title.length > 0);
  return (
    <>
      <div className='notification__preview android--chrome'>
        <Row className='notification__preview_url-bar' wrap={false}>
          <Col className='url-left' flex='1 1 auto'>
            <Row align='middle' wrap={false}>
              <Col flex='0 0 16px'>
                <ChromeFilled className='browser-icon' />
              </Col>
              <Col flex='0 0 auto'>
                <Text className='browser-name'>Chrome&nbsp;•&nbsp;</Text>
              </Col>
              <Col flex='0 1 auto' style={{ overflow: 'auto' }}>
                <Text className='site-url' ellipsis>
                  {props.url}
                </Text>
              </Col>
              <Col flex='0 0 40px'>
                <Text className='timestamp'>&nbsp;•&nbsp;now</Text>
              </Col>
            </Row>
          </Col>
          <Col className='url-right'>
            <DownOutlined
              rotate={isOpen ? 180 : 0}
              onClick={() => setIsOpen(!isOpen)}
              className='notification__preview__arrow-icon'
            />
          </Col>
        </Row>
        <div className='notification__preview__body'>
          <div className='left'>
            <Text strong ellipsis className='fs-13'>
              {props.title}
            </Text>
            <Paragraph
              ellipsis={{ rows: !isOpen || props.big_image ? 2 : 4 }}
              className='fs-13 mb-0'
            >
              {props.message}
            </Paragraph>
          </div>
          <div className='right'>{props.imgUrl && <img src={props.imgUrl} alt='' />}</div>
        </div>
        {isOpen && (
          <>
            {props.big_image && (
              <div className='notification__preview_big-image mt-8'>
                <img src={props.big_image} alt={props.title} />
              </div>
            )}

            <div className='notification__preview__footer'>
              {props.btn1 && props.btn1.title.length > 0 && (
                <div className='notification__preview__cta-btn'>
                  <a className='ellipsis' href={props.btn1.url} target='_blank' rel='noreferrer'>
                    {props.btn1.title}
                  </a>
                </div>
              )}
              {props.btn2 && props.btn2.title.length > 0 && (
                <div className='notification__preview__cta-btn'>
                  <a className='ellipsis' href={props.btn2.url} target='_blank' rel='noreferrer'>
                    {props.btn2.title}
                  </a>
                </div>
              )}
              <div className='notification__preview__cta-btn'>
                <span className='ellipsis'>{hasActionBtn ? 'Settings' : 'Site Settings'}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default AndroidChrome;
