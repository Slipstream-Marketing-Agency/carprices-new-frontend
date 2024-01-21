import React from 'react'
import Brands from '../Brands'

export default function FilterByBrands(props) {
  return (
<section className="my-2">
      <div className="card_wrapper">
        <div className="row">
          <Brands  props={props.brands} filter={true} updateFilterData={props.updateFilterData}/>
        </div>
        {/* <ViewAllButton text={"View All Brands"} link="/brands"/> */}
      </div>
    </section>
  )
}
