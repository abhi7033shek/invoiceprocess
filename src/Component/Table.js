import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";

export const Table = ({ rows = [], deleteRow, editRow }) => {
  return (
    <div>
      <table className='sino'>
        <thead>
          <tr>
            <th>SI No.</th>
            <th>Particular Part No</th>
            <th>HSN Code</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Line Total</th>
            <th>Tax</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const lineTotal = row.qty * row.unitprice;
            const taxValue = (lineTotal * row.taxpercent)/100;
            return (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{row.partno}</td>
                <td>{row.hsncode}</td>
                <td>{row.qty}</td>
                <td>{row.unitprice}</td>
                <td>{lineTotal.toFixed(2)}</td>
                <td>{row.taxpercent}% = {taxValue}</td>
                <td>
                  <span className="actions">
                    <BsFillTrashFill
                      className="delete-btn"
                      onClick={() => deleteRow(idx)}
                    />
                    <BsFillPencilFill
                      className="edit-btn"
                      onClick={() => editRow(idx)}
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
