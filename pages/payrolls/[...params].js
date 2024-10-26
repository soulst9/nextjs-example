import { useRouter } from "next/router";
import { Table, Button } from "rsuite";

// http://localhost:3000/payrolls/EX00000056/202212/steps/0

const { ColumnGroup, Column, HeaderCell, Cell } = Table;

export default function PayRoll({ data }) {
  const router = useRouter();

  const openCommute = (enterprise, contractNo, yyyymm) => {
    router.push(`/commutes/${enterprise}/${contractNo}/${yyyymm}`);
  };

  // entpr/${enterprise}/users/${userId}/contract/136
  const openContract = (enterprise, userId, contractNo) => {
    // console.log(id);
    router.push(`/contracts/${enterprise}/${userId}/${contractNo}`);
  };

  const CommuteCell = ({ rowData, dataKey, onClick, ...props }) => {
    return (
      <Cell {...props} style={{ padding: "6px" }}>
        <Button
          appearance="link"
          onClick={() => {
            onClick(rowData.enterprise, rowData.contractNo, rowData.yyyymm);
          }}
        >
          {"열기"}
        </Button>
      </Cell>
    );
  };

  const ContractCell = ({ rowData, dataKey, onClick, ...props }) => {
    return (
      <Cell {...props} style={{ padding: "6px" }}>
        <Button
          appearance="link"
          onClick={() => {
            onClick(rowData.enterprise, rowData.userId, rowData.contractNo);
          }}
        >
          {"열기"}
        </Button>
      </Cell>
    );
  };

  return (
    <>
      <div>
        <h1>급여대장</h1>
      </div>
      <Table
        height={800}
        headerHeight={80}
        data={data}
        bordered
        cellBordered
        // onRowClick={(rowData) => {
        //   console.log(rowData);
        // }}
      >
        <Column width={100} align="center" verticalAlign="middle" fixed>
          <HeaderCell>출퇴근기록부</HeaderCell>
          <CommuteCell dataKey="commute" onClick={openCommute} />
        </Column>
        <Column width={100} align="center" verticalAlign="middle" fixed>
          <HeaderCell>계약서</HeaderCell>
          <ContractCell dataKey="contract" onClick={openContract} />
        </Column>
        <Column width={100} align="center" verticalAlign="middle" fixed>
          <HeaderCell>사원코드</HeaderCell>
          <Cell dataKey="code" />
        </Column>

        <Column width={150} align="center" verticalAlign="middle" fixed>
          <HeaderCell>사원명</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column width={100} align="center" verticalAlign="middle">
          <HeaderCell>부서</HeaderCell>
          <Cell dataKey="dept" />
        </Column>

        <Column width={150} align="center" verticalAlign="middle">
          <HeaderCell>직급</HeaderCell>
          <Cell dataKey="rank" />
        </Column>

        <ColumnGroup header="수당" align="center">
          <Column width={130}>
            <HeaderCell>기본급</HeaderCell>
            <Cell dataKey="basePay" />
          </Column>
          <Column width={130}>
            <HeaderCell>상여</HeaderCell>
            <Cell dataKey="bonusPay" />
          </Column>
          <Column width={130}>
            <HeaderCell>식대</HeaderCell>
            <Cell dataKey="mealPay" />
          </Column>
          <Column width={130}>
            <HeaderCell>자가운전보조금</HeaderCell>
            <Cell dataKey="drivingPay" />
          </Column>
          <Column width={130}>
            <HeaderCell>직책수당</HeaderCell>
            <Cell dataKey="positionPay" />
          </Column>
          <Column width={130}>
            <HeaderCell>기타수당</HeaderCell>
            <Cell dataKey="etcPay" />
          </Column>
          <Column width={130}>
            <HeaderCell>근속수당</HeaderCell>
            <Cell dataKey="longPay" />
          </Column>
          <Column width={130}>
            <HeaderCell>추가연장수당</HeaderCell>
            <Cell dataKey="overPay" />
          </Column>
          <Column width={130}>
            <HeaderCell>교통(유류비)</HeaderCell>
            <Cell dataKey="transPay" />
          </Column>
          <Column width={130}>
            <HeaderCell>휴일근로수당</HeaderCell>
            <Cell dataKey="holidayworkPay" />
          </Column>
          <Column width={130}>
            <HeaderCell>교육지원비</HeaderCell>
            <Cell dataKey="benefitsPay" />
          </Column>
          <Column width={130}>
            <HeaderCell>지급액계</HeaderCell>
            <Cell dataKey="sumPay" />
          </Column>
        </ColumnGroup>
        <ColumnGroup header="공제" align="center">
          <Column width={130}>
            <HeaderCell>국민연금</HeaderCell>
            <Cell dataKey="pension" />
          </Column>
          <Column width={130}>
            <HeaderCell>건강보험</HeaderCell>
            <Cell dataKey="healthIns" />
          </Column>
          <Column width={130}>
            <HeaderCell>고용보험</HeaderCell>
            <Cell dataKey="employmentIns" />
          </Column>
          <Column width={130}>
            <HeaderCell>장기요양보험료</HeaderCell>
            <Cell dataKey="longtermcareIns" />
          </Column>
          <Column width={130}>
            <HeaderCell>소득세</HeaderCell>
            <Cell dataKey="incomeTax" />
          </Column>
          <Column width={130}>
            <HeaderCell>지방소득세</HeaderCell>
            <Cell dataKey="localIncomeTax" />
          </Column>
          <Column width={130}>
            <HeaderCell>학자금상환액</HeaderCell>
            <Cell dataKey="studentfundsRepay" />
          </Column>
          <Column width={130}>
            <HeaderCell>건강보험 정산</HeaderCell>
            <Cell dataKey="healthInsSettlement" />
          </Column>
          <Column width={130}>
            <HeaderCell>장기요양 정산</HeaderCell>
            <Cell dataKey="careInsSettlement" />
          </Column>
          <Column width={130}>
            <HeaderCell>국민연금 정산</HeaderCell>
            <Cell dataKey="pensionSettlement" />
          </Column>
          <Column width={130}>
            <HeaderCell>고용보험 정산</HeaderCell>
            <Cell dataKey="employmentInsSettlement" />
          </Column>
          <Column width={130}>
            <HeaderCell>공제액계</HeaderCell>
            <Cell dataKey="sumDeduction" />
          </Column>
        </ColumnGroup>
        <Column width={150} align="center" verticalAlign="middle">
          <HeaderCell>차인지급액</HeaderCell>
          <Cell dataKey="sumRealPay" />
        </Column>
      </Table>
    </>
  );
}

// export async function getServerSideProps({ params: { params } }) {
export async function getServerSideProps({ query }) {
  // console.log("===>", query);
  const { params, accessToken } = query;
  const [enterprise, yyyymm] = params || [];

  console.log(
    `${process.env.API_URL}/v2/entpr/${enterprise}/payrolls/${yyyymm}/steps/1?accessToken=${accessToken}`
  );

  const response = await fetch(
    `${process.env.API_URL}/v2/entpr/${enterprise}/payrolls/${yyyymm}/steps/1?accessToken=${accessToken}`,
    {
      headers: {
        // Authorization: "Basic " + base64.encode("APIKEY:X"),
        "Content-Type": "application/json",
      },
      method: "GET",
    }
  );

  console.log(response.ok);

  if (!response.ok) {
    return {
      props: {
        data: [],
      },
    };
  }

  const { data } = await response.json();
  if (data.length === 0) {
    return {
      props: {
        data: [],
      },
    };
  }

  const payroll = data.map((item) => {
    return {
      enterprise: item.enterprise,
      userId: item.employeeId,
      yyyymm: item.yyyymm,
      contractNo: item.contractNo,
      ...item.result,
    };
  });
  const displayPayroll = payroll.map((paystub) => {
    Object.keys(paystub).forEach((item) => {
      if (typeof paystub[item] == "number") {
        paystub[item] = paystub[item].toLocaleString();
      } else {
        paystub[item] = paystub[item];
      }
    });

    return paystub;
  });

  return {
    props: {
      data: displayPayroll,
    },
  };
}
