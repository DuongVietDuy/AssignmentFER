import React from 'react'
import { Carousel } from 'react-bootstrap'

const AppCarousel = () => {

    var banner = [
        {
            id: 1,
            image: 'https://cdna.artstation.com/p/assets/images/images/016/814/076/large/shuja-shuaib-bus-panel-2.jpg?1553579756',
            title: 'The perfect design for your website',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab suscipit dicta nulla. Consequuntur obcaecati officiis, labore doloribus non tempore impedit consequatur ab dolor. Explicabo quam repellendus vero omnis, nisi odio!',
            link: 'https://www.google.com'
        },
        {
            id: 2,
            image: 'https://cdnb.artstation.com/p/assets/images/images/016/802/459/large/shuja-shuaib-banner.jpg?1553535424',
            title: 'Start Your Future Financial Plan',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab suscipit dicta nulla. Consequuntur obcaecati officiis, labore doloribus non tempore impedit consequatur ab dolor. Explicabo quam repellendus vero omnis, nisi odio!',
            link: 'https://www.facebook.com'
        },
        {
            id: 3,
            image: 'https://www.hardsoftcomputers.co.uk/wp-content/uploads/2023/09/iphone-15-gallery-family-image.jpg',
            title: 'Enjoy the Difference',
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab suscipit dicta nulla. Consequuntur obcaecati officiis, labore doloribus non tempore impedit consequatur ab dolor. Explicabo quam repellendus vero omnis, nisi odio!',
            link: 'https://www.twitter.com'
        }
    ]
    return (
        <Carousel className='my-4'>
            {
                banner.map((data) => {
                    return (
                        <Carousel.Item key={data.id}>
                            <img
                                className="d-block w-100"
                                src={data.image}
                                alt={"Slide" + data.id}
                                style={{
                                    width: '600px',
                                    height: '500px'
                                }}
                            />
                        </Carousel.Item>
                    )
                })}
        </Carousel>
    )
}

export default AppCarousel