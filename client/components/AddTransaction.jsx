import React from 'react'
import { connect } from 'react-redux'
import { newTransaction, deleteTransactions } from '../actions/transactions'

class AddTransaction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transaction: {},
      group_members: [],
      showTransactionForm: false,
      error: false
    }
  }

  updateDetails = (e) => {
    this.setState({
      group_members: this.props.groupMembers.filter(({ group_id }) => group_id == this.props.activeGroup)
    })

    this.setState({
      transaction: {
        ...this.state.transaction,
        [e.target.name]: e.target.value,
        group_id: this.props.activeGroup,

      }
    })
  }

  toggleTransaction = (e) => {
    this.setState({
      showTransactionForm: !this.state.showTransactionForm
    })
  }

  submit = (e) => {
    console.log(this.state)
    e.preventDefault()

    if (this.state.transaction.transactionName == "" || !this.state.transaction.groupMemberId) {
      this.setState({
        error: true
      })
    } else {
      this.props.dispatch(newTransaction(this.state))
      this.setState({
        error: false
      })
    }



  }


  render() {

    let members = this.props.groupMembers.filter(({ group_id }) => group_id == this.props.activeGroup)

    return (
      <>
        <div className="form-content">
          <h2 className="subTitle" onClick={this.toggleTransaction}>Add New Transaction <i className="dashHeader fas fa-chevron-circle-down"></i></h2>
          {this.state.showTransactionForm &&
            <div className="animated fadeIn">
              <form className="transactionForm" onSubmit={this.submit}>
                <div className="row">
                  <div className="col-lg-4 col-sm-12">
                    <label className="inputLabel">Transaction description</label>
                    <input className='form-control' type='text' name='transactionName' placeholder="eg. Breakfast at Tiffany's" onChange={this.updateDetails}></input>
                  </div>
                  <div className="col-lg-3 col-sm-12">
                    <label className="inputLabel">Paid by</label>
                    <select className='form-control' name='groupMemberId' onChange={this.updateDetails}>
                      <option></option>
                      {members.map((member, i) => {
                        return <option value={member.groupMember_id} key={i}>{member.member_name}</option>
                      })}
                    </select>
                  </div>
                  <div className="col-lg-2 col-sm-12 transactionAmountWrapper">
                    <label className="inputLabel">Amount</label>
                    <span className='transactionAmountInput'></span>
                    <input className='form-control' type='number' name='transactionTotal' placeholder='0.00' onChange={this.updateDetails}></input>
                  </div>
                </div>
                <div>
                  <label className="inputLabel">Split by all members? </label>
                  <input type='checkbox' name='membersOwing' defaultChecked></input>
                </div>
                <div>
                  <label className="inputLabel">Split cost evenly? </label>
                  <input type='checkbox' name='amountMembersOwing' defaultChecked></input>
                </div>
                <div>
                  <button className="addTransactionButton btn custom-button btn-lg" type="submit" onClick={this.submit}>
                    Add Transaction
              </button>
                </div>
              </form>
              {this.state.error == true && <p style={{ color: "red" }}>Please fill in all the details in the form</p>}
            </div>}
        </div>
      </>
    )
  }
}

const mapStateToProps = (reduxState) => {
  return {
    groupMembers: reduxState.groupMembers,
    activeGroup: reduxState.activeGroup
  }
}

export default connect(mapStateToProps)(AddTransaction)