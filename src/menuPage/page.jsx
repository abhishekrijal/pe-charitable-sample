import { Typography, Card, Col, Row, Button } from 'antd';
import { BellFilled, UserOutlined } from '@ant-design/icons';
const { Title, Paragraph } = Typography;
import { __ } from '@wordpress/i18n';
import Windows11Chrome from './notifications/Windows11Chrome';
import MacOSChrome from './notifications/MacOSChrome';
import Windows10Firefox from './notifications/Windows10Firefox';
import Windows10Chrome from './notifications/Windows10Chrome';
import AndroidChrome from './notifications/AndroidChrome';

const sampleNotification = {
    title: 'Welcome to PushEngage',
    message: 'You have successfully subscribed to PushEngage',
    url: 'https://www.pushengage.com',
    imgUrl: 'https://picsum.photos/200',
    big_image: 'https://picsum.photos/600',
    btn1: {
        title: 'Allow',
        url: 'https://www.pushengage.com',
    },
    btn2: {
        title: 'Block',
        url: 'https://www.pushengage.com',
    },
};

const handleOnClickTestNotification = () => {
    const { message, imgUrl, big_image, url } = sampleNotification;
    const options = {
        body: message,
        icon: imgUrl,
        image: big_image,
        data: url,
        requireInteraction: false,
        tag: 'welcome_notification',
    };
    const notification = new Notification('Test Notification', options);
    notification.onclick = function () {
        if (options.data) {
            window.open(options.data, '_blank');
        }
        this.close();
    };
};

const NotificationPreview = ({ title, Component }) => (
    <Row gutter={16} className='mt-20 mt-12'>
        <Col md={6} xs={24} className='pe-mb-15'>
            <Title level={5}>{title}</Title>
        </Col>
        <Col md={18} xs={24}>
            <Row align='middle' gutter={[16, 16]}>
                <Col>
                    <Component {...sampleNotification} />
                </Col>
            </Row>
        </Col>
    </Row>
);

const askPermission = () => {
    return new Promise(resolve => {
      Notification.requestPermission(result => {
        resolve(result);
      });
    });
  }

const MenuPage = () => (
    <>
        <Card
            style={{ width:'500px', marginTop:'40px', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <Title level={4}><BellFilled/> Stay Updated</Title>
            <Paragraph>
                Allow donors to signup for critical updates for your campaign. This ensures they stay informed about important developments and can engage more effectively.
            </Paragraph>
            <Button type="primary" onClick={askPermission} block>
                Sign Up for Updates
            </Button>
            </Card>
        <Title level={4}>{__('Notification Preview', 'pushengage')}</Title>
        <Card className='pe-campaign-card' bordered={false}>
            <Row className='mt-12'>
                <Col>
                    <Button type='primary' onClick={handleOnClickTestNotification}>
                        {__('Test Notification', 'pushengage')}
                    </Button>
                </Col>
            </Row>
            <NotificationPreview title={__('Chrome on Windows', 'pushengage')} Component={Windows11Chrome} />
            <NotificationPreview title={__('Chrome on MacOS', 'pushengage')} Component={MacOSChrome} />
            <NotificationPreview title={__('Chrome on Android', 'pushengage')} Component={AndroidChrome} />
            <NotificationPreview title={__('Firefox on Windows 10', 'pushengage')} Component={Windows10Firefox} />
            <NotificationPreview title={__('Chrome on Windows 10', 'pushengage')} Component={Windows10Chrome} />
            <Row className='mt-12'>
                <Col>
                    <Button type='primary' onClick={handleOnClickTestNotification}>
                        {__('Test Notification', 'pushengage')}
                    </Button>
                </Col>
            </Row>
        </Card>
    </>
);

export default MenuPage;