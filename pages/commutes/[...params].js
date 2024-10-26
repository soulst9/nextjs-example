// import Seo from "../../components/Seo";
// import { useRouter } from "next/router";
import { Table, Button, IconButton } from "rsuite";
const { ColumnGroup, Column, HeaderCell, Cell, ActionCell } = Table;

export default function Commute({ data }) {
  return (
    <>
      <div>
        <h1>출퇴근 기록부</h1>
      </div>
      <Table
        height={800}
        width={1400}
        headerHeight={40}
        data={data}
        bordered
        cellBordered
        // onRowClick={(rowData) => {
        //   console.log(rowData);
        // }}
      >
        <Column width={200} align="center" verticalAlign="middle">
          <HeaderCell>날짜</HeaderCell>
          <ActionCell dataKey="date" />
        </Column>
        <Column width={200} align="center" verticalAlign="middle">
          <HeaderCell>요일</HeaderCell>
          <ActionCell dataKey="dayWeek" />
        </Column>
        <Column width={200} align="center" verticalAlign="middle">
          <HeaderCell>출근시간</HeaderCell>
          <Cell dataKey="startTime" />
        </Column>

        <Column width={200} align="center" verticalAlign="middle">
          <HeaderCell>퇴근시간</HeaderCell>
          <Cell dataKey="endTime" />
        </Column>

        <Column width={200} align="center" verticalAlign="middle">
          <HeaderCell>연장근무</HeaderCell>
          <Cell dataKey="overWorktime" />
        </Column>

        <Column width={200} align="center" verticalAlign="middle">
          <HeaderCell>야간근무</HeaderCell>
          <Cell dataKey="nightWorktime" />
        </Column>

        <Column width={200} align="center" verticalAlign="middle">
          <HeaderCell>총근무시간</HeaderCell>
          <Cell dataKey="sumWorktime" />
        </Column>
      </Table>
    </>
  );
}

// entpr/${enterprise}/users/${userId}/yyyymm/202212/commute
export async function getServerSideProps({ params: { params } }) {
  try {
    // console.log(params);
    const [enterprise, contractno, yyyymm] = params || [];
    // const response = await fetch(
    //   `${process.env.API_URL}/v2/entpr/${enterprise}/users/${userId}/payrolls/${yyyymm}/commute`
    // );
    const response = await fetch(
      `${process.env.API_URL}/user/work/workhistory2`,
      {
        body: JSON.stringify({ yyyymm, contractno }),
        headers: {
          // Authorization: "Basic " + base64.encode("APIKEY:X"),
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    if (!response.ok) {
      return {
        props: {
          data: [],
        },
      };
    }

    const { workhistory } = await response.json();
    // console.log("<==================================================>");
    // const { result } = response;
    // console.log(result);
    return {
      props: {
        data: workhistory || [],
      },
    };
  } catch (error) {
    console.log("error", error);
  }
}
