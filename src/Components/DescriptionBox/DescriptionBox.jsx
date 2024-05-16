import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Description</div>
            <div className="descriptionbox-nav-box fade">Reviews (122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>An e-commerce website, simply put, is an online store. It's a platform where goods and services are traded between buyers and sellers over the internet. Unlike a physical storefront, an e-commerce website can be accessed at any time, from anywhere, as long as there's an internet connection. As a digital shopfront displays products or services, allows users to select and purchase them and facilitates the processing of payments.
            </p>
            <p>What distinguishes an e-commerce website from other types of websites is its ability to handle transactions. E-commerce transactions are the lifeblood of any online store, allowing for the exchange of goods, services, and funds over the web. These transactions are supported by e-commerce platforms—specialized software solutions that provide the necessary ecommerce tools for managing sales, inventory, customers and other critical aspects of online business operations. Website builders like Wix incorporate eCommerce features in their platforms to help you build a successful online store.</p>
        </div>
    </div>
  )
}

export default DescriptionBox
