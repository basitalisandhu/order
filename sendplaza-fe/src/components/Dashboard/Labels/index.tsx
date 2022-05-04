import Loader from "components/Common/Loader";
import {
  AddPostmenKeyModalContainer,
  // SelectPostmenKeyContainer,
} from "pages/App/containers/dashboard";
import React, { useMemo } from "react";
import { Alert, Button, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { GET_LABELS } from "state/types";

// Then, use it in a component.
function Labels({ labels, next_token, postmenKey, getLabelsAction }) {
  const data = useMemo(() => {
    return labels.map((label) => {
      return {
        id: label.id,
        orderId: label.references.join(","),
        paper_size: label.files?.label.paper_size,
        url: label.files?.label.url,
        service_type: label.service_type,
        created_at: label.created_at,
        shipper_account: label.rate?.shipper_account.description,
        tracking_numbers: label.tracking_numbers.join(","),
        status: label.status,
      };
    });
  }, [labels]);

  const columns = useMemo(() => {
    return [
      {
        name: "label Id",
        selector: "id",
        sortable: true,
        cell: (row) => <div>{row.id}</div>,
      },
      { name: "Order Id", selector: "orderId", sortable: true },
      { name: "Paper Size", selector: "paper_size", sortable: true },
      {
        name: "url",
        selector: "url",
        sortable: true,
        cell: (row) => (
          <a href={row.url} target="_blank" rel="noopener noreferrer">
            {row.url}
          </a>
        ),
      },
      { name: "Service type", selector: "service_type", sortable: true },
      {
        name: "Created At",
        selector: "created_at",
        sortable: true,
        cell: (row) => (
          <div>
            <p>{row.created_at.split("T")[0]}</p>
            {row.created_at.split("T")[1]}
          </div>
        ),
      },
      {
        name: "Ship Account",
        selector: "shipper_account",
        sortable: true,
        cell: (row) => <div>{row.shipper_account}</div>,
      },
      {
        name: "tracking_numbers",
        selector: "tracking_numbers",
        sortable: true,
        cell: (row) => <div>{row.tracking_numbers}</div>,
      },
      { name: "Status", selector: "status", sortable: true },
    ];
  }, []);

  return (
    <Col>
      {/* <SelectPostmenKeyContainer /> */}

      {postmenKey ? (
        <>
          {/* <Col md={12} className="pt-3 pb-3 text-center">
            <Button className="ml-3" onClick={() => getLabelsAction()}>
              Fetch Labels
            </Button>
          </Col> */}
          <Loader type={[GET_LABELS]}>
            <Col md={12}>
              <DataTable columns={columns} data={data} />
            </Col>
          </Loader>
          {next_token && (
            <Col md={12} className="pt-3 pb-3 text-center">
              <Button className="ml-3" onClick={() => getLabelsAction(true)}>
                Load More Labels
              </Button>
            </Col>
          )}
        </>
      ) : (
        <Col md={12} className="pt-3 text-center">
          <Alert variant="primary">Select Postmen key to fetch labels</Alert>
        </Col>
      )}
      <AddPostmenKeyModalContainer />
    </Col>
  );
}

export default Labels;
