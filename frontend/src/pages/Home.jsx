import React from 'react'
import Hero from '../components/Hero'
import SpecialtiesGrid from '../components/SpecialtiesGrid '
import PartnerSection from '../components/PartnerSection'
import TestimonialsSection from '../components/TestimonialsSection'

const Home = () => {
  return (
   <>
    <Hero/>
   <SpecialtiesGrid/>
   <PartnerSection/>
   <TestimonialsSection/>
   </>
  )
}

export default Home