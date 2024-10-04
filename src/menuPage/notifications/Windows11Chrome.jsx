import { Col, Row, Typography } from 'antd';
import ChromeImage from '../../assets/img/chrome.png';
import {
  EllipsisOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import { __ } from '@wordpress/i18n';
import './Windows11Chrome.scss';

const { Text } = Typography;

const Windows11Chrome = (props) => {
  const hasFirstActionBtn = props.btn1 && props.btn1.title.length > 0;
  const hasSecondActionBtn = props.btn2 && props.btn2.title.length > 0;
  const hasActionButton = hasFirstActionBtn || hasSecondActionBtn;

  return (
    <div className='notification__preview windows11--chrome'>
      {props.big_image && (
        <div className='notification__preview_big-image'>
          <img src={props.big_image} alt={props.title} />
        </div>
      )}
      <Row
        justify='space-between'
        className={`notification_header px-10 pt-8 pb-4  ${
          !props.big_image ? 'rounded-top-8' : ''
        }`}
      >
        <Col>
          <div className='d-inline'>
            <img src={ChromeImage} alt='' width={16} height={16} className='pa-1' />
          </div>
          <span className='fs-12 ml-6'>{__('Google Chrome', 'pushengage')}</span>
        </Col>
        <Col>
          <EllipsisOutlined rotate={90} className='fs-10 color-neutral-20 mr-24' />
          <CloseOutlined className='fs-10 color-neutral-20' />
        </Col>
      </Row>
      <Row className='notification_body' wrap={false}>
        {props.imgUrl && (
          <Col className='notification_icon'>
            <img src={props.imgUrl} alt='' />
          </Col>
        )}

        <Col className='notification_content'>
          <div className='notification_preview_title'>{props.title}</div>
          <div className='notification_preview_message'>{props.message}</div>
          <Text ellipsis className='notification_preview_url fs-12'>
            {props.url}
          </Text>
        </Col>
      </Row>
      <div
        className={`action-buttons  ${
          hasFirstActionBtn && hasSecondActionBtn ? 'd-flex' : 'd-block'
        }`}
      >
        {hasFirstActionBtn && (
          <a
            className='notification_preview_button notification_preview_button1'
            href={props.btn1?.url}
            target='_blank'
            rel='noreferrer'
          >
            {props.btn1?.image_url && <img src={props.btn1.image_url} alt='' />}

            {props.btn1?.title?.slice(0, 12)}
          </a>
        )}
        {hasSecondActionBtn && (
          <a
            className='notification_preview_button notification_preview_button2'
            href={props.btn2?.url}
            target='_blank'
            rel='noreferrer'
          >
            {props.btn2?.image_url && <img src={props.btn2.image_url} alt='' />}

            {props.btn2?.title?.slice(0, 12)}
          </a>
        )}

        {
          // if no button is present, then show close button
          !hasActionButton && (
            <span className='notification_preview_button'>{__('Close', 'pushengage')}</span>
          )
        }
      </div>
    </div>
  );
};

export default Windows11Chrome;
