import React from 'react'
import FinancingBreakdown from './FinancingBreakdown'
import LoanCalculator from './LoanCalculator'
import Price from '@/utils/Price'

const MainPriceComponent = ({ currentmodel, year }) => {
  return (
    <>
      <h1 className="font-semibold text-3xl mb-5">{currentmodel.brand?.name} {currentmodel.name} {year} Price in UAE</h1>
      <p>
        {currentmodel.brand?.name} {currentmodel.name} price in the UAE starts at <Price data={currentmodel.price?.min} /> for the base variant and goes all the way up to <Price data={currentmodel.price?.max} /> for the top-spec variant. Check out the {currentmodel.brand?.name} {currentmodel.name} variant-wise price list and available special promo offers below. Also, get the best price by requesting quotes from authorised {currentmodel.brand?.name} dealerships.
      </p>
      <div className='flex flex-col gap-6'>
        <FinancingBreakdown vehicleName={`${year} ${currentmodel.brand?.name} ${currentmodel.name}`} variants={currentmodel.trims} />

        <LoanCalculator vehicleName={`${year} ${currentmodel.brand?.name} ${currentmodel.name}`} variants={currentmodel.trims} />
      </div>
    </>
  )
}

export default MainPriceComponent