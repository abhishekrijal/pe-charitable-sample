import { Typography } from 'antd';
import {
  CloseOutlined,
} from '@ant-design/icons';
import './Windows10Firefox.scss';

const { Text } = Typography;

const Windows10Firefox = (props) => {
  return (
    <div className='notification__preview windows10--firefox'>
      <div className='notificiation__preview_url-bar'>
        <div className='url-left'>
          <Text ellipsis strong>
            {props.title}
          </Text>
        </div>
        <div className='url-right ml-4'>
          <CloseOutlined className='color-neutral-60 fs-10' />
        </div>
      </div>
      <div style={{ display: 'flex' }}>
        <div className='left'>{props.imgUrl ? <img src={props.imgUrl} alt='' /> : null}</div>
        <div className='right'>
          <p className='notification_preview_message color-neutral-80'>
            {props.message.trim() !== '' ? props.message.substring(0, 135) : 'Sample Message'}
          </p>
          <span> {`via ${props.url}`}</span>
        </div>
      </div>
    </div>
  );
};

export default Windows10Firefox;
