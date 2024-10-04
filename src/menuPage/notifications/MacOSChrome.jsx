import React, { useEffect, useState } from 'react';
import { Col, Dropdown, Menu, Row, Space, Typography } from 'antd';

import ChromeImage from '../../assets/img/chrome.png';

import {
  RightOutlined,
  CloseOutlined,
  EllipsisOutlined
} from '@ant-design/icons';

import './MacOSChrome.scss';

const { Text, Paragraph } = Typography;

const MacOSChrome = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    if (!props.imgUrl) {
      setIsExpanded(false);
    }
  }, [props]);

  const hasSmallImage = !!props.imgUrl;
  const hasActionButton = !!props.btn1?.title || !!props.btn2?.title;
  const menuItems = [];
  if (hasActionButton) {
    if (props.btn1?.title) {
      menuItems.push({
        key: 'btn-1',
        label: (
          <a target='_blank' rel='noopener noreferrer' href={props.btn1.url}>
            {props.btn1.title}
          </a>
        ),
      });
    }

    if (props.btn2?.title) {
      menuItems.push({
        key: 'btn-2',
        label: (
          <a target='_blank' rel='noopener noreferrer' href={props.btn2.url}>
            {props.btn2.title}
          </a>
        ),
      });
    }

    menuItems.push({
      key: 'settings',
      label: 'Settings',
    });
  }

  const DropDownMenu = (
    <Menu>
      {menuItems.map(item => (
        <Menu.Item key={item.key}>{item.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div
      className={`notification__preview macos--chrome p-relative ${
        isDropdownVisible ? 'notification__preview__dropdown--open' : ''
      } ${isExpanded ? 'notification__preview--expanded' : ''}`}
    >
      {isExpanded && (
        <>
          <div className='notification__preview__header' />
          <div className='notification__preview__image-container'>
            <img
              src={props.imgUrl}
              alt='icon'
              className='notification__preview__image-container__img'
            />
          </div>
        </>
      )}
      <div className='notification__preview__close-btn'>
        <CloseOutlined />
      </div>
      {hasSmallImage && (
        <div className='notification__preview__arrow-btn'>
          <Space size={8}>
            {isExpanded && <EllipsisOutlined rotate={90} />}
            <RightOutlined
              rotate={isExpanded ? 90 : 0}
              onClick={() => {
                setIsExpanded(!isExpanded);
              }}
            />
          </Space>
        </div>
      )}
      {!isExpanded && (
        <div className='notification__preview__settings'>
          {!hasActionButton ? (
            'Settings'
          ) : (
            <Dropdown
              overlay={DropDownMenu}
              trigger={['click']}
              destroyPopupOnHide
              onVisibleChange={visible => setIsDropdownVisible(visible)}
              overlayClassName='notification__preview__settings-dropdown'
            >
              <Space size={4}>
                Options
                <RightOutlined rotate={90} style={{ fontSize: '8px' }} />
              </Space>
            </Dropdown>
          )}
        </div>
      )}
      <Row align='middle' wrap={false} className='notification__preview__body'>
        <Col flex='48px' style={{}}>
          <div className='bg-white ta-center notification__preview__browser-icon'>
            <img src={ChromeImage} alt='' width={36} />
          </div>
        </Col>
        <Col flex='auto'>
          <Text ellipsis strong className='lh-100 notification__preview__title'>
            {props.title}
          </Text>
          <Row wrap={false}>
            <Col flex='auto'>
              <div className='lh-100'>
                <Text strong ellipsis className='notification__preview__url'>
                  {props.url}
                </Text>
              </div>
              <Paragraph
                className='notification__preview__message'
                ellipsis={{ rows: isExpanded ? 10 : 3 }}
              >
                {props.message}
              </Paragraph>
            </Col>
            {!isExpanded && (
              <Col>
                {props.imgUrl ? (
                  <div className='notification__preview_small-icon ml-4 mt-5'>
                    <img
                      src={props.imgUrl}
                      alt=''
                      width={32}
                      height={32}
                      style={{ borderRadius: '5px', objectFit: 'cover' }}
                    />
                  </div>
                ) : null}
              </Col>
            )}
          </Row>
        </Col>
      </Row>
      {isExpanded && (
        <div className='notification__preview__footer'>
          <div className='notification__preview__footer__btns'>
            {props.btn1?.title && (
              <div className='notification__preview__footer__btns__btn'>
                <a href={props.btn1.url} target='_blank' rel='noopener noreferrer' className=''>
                  {props.btn1.title}
                </a>
              </div>
            )}
            {props.btn2?.title && (
              <div className='notification__preview__footer__btns__btn'>
                <a href={props.btn2.url} target='_blank' rel='noopener noreferrer'>
                  {props.btn2.title}
                </a>
              </div>
            )}
            <div className='notification__preview__footer__btns__btn'>Settings</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MacOSChrome;
