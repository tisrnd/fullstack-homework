import { PureComponent, ReactElement } from 'react'
import { sortBy } from 'lodash'

import CropSelect from './CropSelect'
import { Crop, Field, SeasonalCrop } from './types'
import { fetchCrops, fetchFields } from './api'
import buildNewFieldsState from './buildNewFieldsState'

type Props = {}

type State = {
  allCrops: Array<Crop>,
  fields: Array<Field>,
}

export default class Table extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      allCrops: [],
      fields: [],
    }
  }

  componentDidMount = async () =>
    this.setState({
      fields: await fetchFields(),
      allCrops: await fetchCrops(),
    })

  updateHumusBalances = async () =>
    this.setState({
      fields: await fetchFields(this.state.fields)
    })
    
  render = (): ReactElement =>
    <div className="table">
      <div className="table__row table__row--header">
        <div className="table__cell">Field name</div>
        <div className="table__cell table__cell--right">Field area (ha)</div>
        <div className="table__cell table__cell--center">2020 crop</div>
        <div className="table__cell table__cell--center">2021 crop</div>
        <div className="table__cell table__cell--center">2022 crop</div>
        <div className="table__cell table__cell--center">2023 crop</div>
        <div className="table__cell table__cell--center">2024 crop</div>
        <div className="table__cell table__cell--right">Humus balance</div>
      </div>

      {sortBy(this.state.fields, field => field.name).map(field => this.renderFieldRow(field))}
    </div>

  renderFieldRow = (field: Field): ReactElement =>
    <div className="table__row" key={field.id}>
      <div className="table__cell">{field.name}</div>
      <div className="table__cell table__cell--right">{field.area}</div>

      {sortBy(field.crops, crop => crop.year).map((seasonalCrop, index) => this.renderCropCell(field, seasonalCrop, index))}

      <div className={"table__cell table__cell--right " + (field.humus > 0 ? "light-green" : "light-red")}>{field.humus}</div>
    </div>

  renderCropCell = (field: Field, seasonalCrop: SeasonalCrop, index: number): ReactElement =>
    <div className="table__cell table__cell--center table__cell--with-select" key={index}>
      <CropSelect
        selectedCrop={seasonalCrop.crop}
        allCrops={this.state.allCrops}
        onChange={newCrop => this.changeFieldCrop(newCrop, field.id, seasonalCrop.year)}
      />
    </div>

  changeFieldCrop = (newCrop: Crop | null, fieldId: number, cropYear: number): void => {
    this.setState(
      buildNewFieldsState(this.state.fields, newCrop, fieldId, cropYear),
      () => this.updateHumusBalances()
    );
  }
}
