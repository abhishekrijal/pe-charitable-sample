import { Col, Row } from 'antd';
import ChromeImage from '../../assets/img/chrome.png';
import {
  CloseOutlined,
} from '@ant-design/icons';
import './Windows10Chrome.scss';

const Windows10Chrome = (props) => {
  return (
    <div className='notification__preview windows10--chrome'>
      {props.big_image && (
        <div className='notification__preview_big-image'>
          <img src={props.big_image} alt={props.title} />
        </div>
      )}
      <Row className='px-8 pt-8 pb-4' justify='space-between'>
        <Col>
          <div className='d-inline'>
            <img
              src={ChromeImage}
              alt=''
              width={14}
              height={14}
              className='pa-1 bg-neutral-40'
            />
          </div>
          <span className='fs-11 color-white ml-6'>Google Chrome</span>
        </Col>
        <Col>
          <CloseOutlined className='fs-10 color-neutral-20' />
        </Col>
      </Row>
      <div style={{ display: 'flex' }}>
        {props.imgUrl && (
          <div className='left'>
            <img src={props.imgUrl} alt='' />
          </div>
        )}

        <div className='right'>
          <h4 className='notification_preview_title'>{props.title}</h4>
          <p className='notification_preview_message'>{props.message}</p>
          <div className='fs-11 ellipsis'>{props.url}</div>
        </div>
      </div>
      <div className='action-buttons'>
        {props.btn1 && props.btn1.title.length > 0 ? (
          <a
            className='notification_preview_button notification_preview_button1'
            href={props.btn1.url}
            target='_blank'
            rel='noreferrer'
          >
            <img src={props.btn1.image_url || ''} alt='' />
            {props.btn1.title.slice(0, 12)}
          </a>
        ) : null}
        {props.btn2 && props.btn2.title.length > 0 ? (
          <a
            className='notification_preview_button notification_preview_button2'
            href={props.btn2.url}
            target='_blank'
            rel='noreferrer'
          >
            <img src={props.btn2.image_url || ''} alt='' />
            {props.btn2.title.slice(0, 12)}
          </a>
        ) : null}
      </div>
    </div>
  );
};

export default Windows10Chrome;
