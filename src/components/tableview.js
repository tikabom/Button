import React from 'react';

class TableView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: null
    };
  }

  propTypes: {
    tableData: React.PropTypes.Array.isRequired,
    onSelectionChanged: React.PropTypes.func
  }

  onSelectionChanged = (e) => {
    this.setState({
      selected: e.currentTarget.value
    });
    this.props.onSelectionChanged(e.currentTarget.value);
  }

  render() {
    if (this.props.tableData.length == 0) return null;

    let tableData = this.props.tableData;

    const headerRows = (
      <tr>
        {this.props.onSelectionChanged && (
          <td>Select</td>
        )}
        {Object.keys(tableData[0]).map((key) => <td>{key.toUpperCase()}</td>)}
      </tr>
    );

    const dataRows = tableData.map((data) => {
      return (
        <tr key={data.id}>
          {this.props.onSelectionChanged && (
            <td>
              <input
                type='radio'
                value={data.id}
                checked={this.state.selected == data.id}
                onChange={this.onSelectionChanged} />
            </td>
          )}
          {Object.keys(data).map((key) => <td>{data[key]}</td>)}
        </tr>
      );
    });

    return (
      <table>
        <thead>{headerRows}</thead>
        <tbody>{dataRows}</tbody>
      </table>
    );
  }
}

export default TableView;
