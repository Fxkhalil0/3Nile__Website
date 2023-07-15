import React from 'react'
import ContactUsHeader from '../../Components/ContactUsHeader/ContactUsHeader'
import ContactUsForm from '../../Components/ContactUsForm/ContactUsForm'
import { AnimatedPageRight } from '../AnimatedPages/AnimatedPages'



function ContactUs(){
    return(
        <>
        <AnimatedPageRight>

       <ContactUsHeader />
       <ContactUsForm />
        </AnimatedPageRight>
        </>
    )
}

export default ContactUs