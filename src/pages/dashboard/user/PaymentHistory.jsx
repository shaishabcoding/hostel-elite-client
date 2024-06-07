import usePayHistory from "../../../hooks/usePayHistory";
import Loading from "../../../components/Loading";

const PaymentHistory = () => {
  const [payHistories, , loading] = usePayHistory();

  return (
    <div className="w-full lg:p-6 px-2 pb-2 lg:mx-0">
      <h2 className="text-2xl lg:mt-0 lg:mb-12 lg:text-5xl font-semibold text-center mb-6">
        Manage Users
      </h2>
      <div className="overflow-x-auto rounded-md border">
        <table className="table table-xs md:table-md table-pin-rows table-pin-cols table-zebra bg-white">
          <thead>
            <tr>
              <th></th>
              <td>Membership</td>
              <td>Price</td>
              <td>Transaction id</td>
              <td>Date</td>
            </tr>
          </thead>
          <tbody>
            {!loading && payHistories?.length < 1 && (
              <tr>
                <td colSpan={5} className="text-center text-error">
                  No Payment Data found.
                </td>
              </tr>
            )}
            {loading ? (
              <tr>
                <td colSpan={6}>
                  <Loading className="my-0" />
                </td>
              </tr>
            ) : (
              payHistories?.map((payHistory, idx) => {
                const { _id, badge, price, paymentId, date } = payHistory;
                return (
                  <tr
                    key={_id}
                    className="dark:bg-gray-400 dark:text-white dark:even:text-gray-700"
                  >
                    <th className="dark:text-black dark:odd:bg-gray-400 ">
                      {idx + 1}
                    </th>
                    <td>{badge}</td>
                    <td>${price}</td>
                    <td className="select-text">{paymentId}</td>
                    <td>
                      {new Date(date).toLocaleString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      })}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
