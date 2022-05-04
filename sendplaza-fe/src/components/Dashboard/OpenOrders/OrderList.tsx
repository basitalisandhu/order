import React, { useMemo, useState } from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { EditOrderContainer } from "pages/App/containers/dashboard";
import Loader from "components/Common/Loader";
import { CREATE_LABELS, GET_ORDERS } from "state/types";

// Then, use it in a component.
function OrderList({ orders, orderErrors, createLabelsAction }) {
  const [editOrder, setEditOrder] = useState(null);
  const [clear, clearSelection] = useState(false);
  const [selected, setSelected] = useState<any>({});

  const data = useMemo(() => {
    return orders.map((order) => {
      return {
        orderId: order.orderId,
        name: `${order.shipmentDetails.firstName} ${order.shipmentDetails.surname}`,
        email: order.shipmentDetails.email,
        address: order.label.shipment.ship_to.street1,
        city: order.label.shipment.ship_to.city,
        zipCode: order.label.shipment.ship_to.postal_code,
        type: order.label.shipment.ship_to.type,
        service_type: order.label.service_type,
        orderPlacedDateTime: order.orderPlacedDateTime,
      };
    });
  }, [orders]);

  const columns = useMemo(() => {
    const onRowClick = (row) => {
      const order = orders.find((order) => order.orderId === row.orderId);
      setEditOrder(order);
    };
    return [
      { name: "Order Id", selector: "orderId", sortable: true },
      { name: "Name", selector: "name", sortable: true },
      {
        name: "Email",
        selector: "email",
        sortable: true,
        cell: (row) => <div>{row.email}</div>,
      },
      {
        name: "Zip Code",
        selector: "zipCode",
        sortable: true,
        cell: (row) => <div>{row.zipCode}</div>,
      },
      {
        name: "Address",
        selector: "address",
        sortable: true,
        cell: (row) => <div>{row.address}</div>,
      },
      {
        name: "City",
        selector: "city",
        sortable: true,
        cell: (row) => <div>{row.city}</div>,
      },
      {
        name: "Type",
        selector: "type",
        sortable: true,
        cell: (row) => <div>{row.type}</div>,
      },
      {
        name: "Service type",
        selector: "service_type",
        sortable: true,
        cell: (row) => <div>{row.service_type}</div>,
      },
      {
        name: "Order Date",
        selector: "orderPlacedDateTime",
        sortable: true,
        cell: (row) => (
          <div className={"pt-2 pb-2"}>
            <p>{row.orderPlacedDateTime.split("T")[0]}</p>
            {row.orderPlacedDateTime.split("T")[1]}
          </div>
        ),
      },
      {
        name: "Action",
        button: true,
        sortable: true,
        cell: (row) => (
          <Button
            onClick={() => {
              onRowClick(row);
            }}
          >
            Edit Label
          </Button>
        ),
      },
    ];
    // eslint-disable-next-line
  }, [orders]);

  const selectableRowSelected = (row) => {
    return (
      selected.selectedRows &&
      selected.selectedRows.find((s) => s.orderId === row.orderId)
    );
  };

  const onSelectedRowsChange = ({
    allSelected,
    selectedCount,
    selectedRows,
  }) => {
    setSelected({ allSelected, selectedCount, selectedRows });
  };

  const createLabels = () => {
    selected.selectedRows = selected.selectedRows.sort(function(a, b) {
      const valueA = new Date(a.orderPlacedDateTime);
      const valueB = new Date(b.orderPlacedDateTime);
      return (valueB as any) - (valueA as any);
    });
    createLabelsAction(selected.selectedRows);
  };

  const handleClearRows = () => {
    clearSelection(!clear);
  };

  return (
    <Col>
      {orderErrors.map((message, idx) => (
        <Alert key={idx} variant={"danger"}>
          {message}
        </Alert>
      ))}
      <Loader type={[GET_ORDERS, CREATE_LABELS]}>
        <Col md={12}>
          <Row>
            {selected.selectedCount > 0 && (
              <>
                <Col md={6} className="d-flex pt-4">
                  <Button onClick={createLabels}>
                    Create Labels ({selected.selectedCount})
                  </Button>
                  <Button
                    className="ml-3"
                    variant="danger"
                    onClick={handleClearRows}
                  >
                    Clear Selection
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Col>
        <Col md={12}>
          <DataTable
            columns={columns}
            selectableRows
            data={data}
            selectableRowSelected={selectableRowSelected}
            onSelectedRowsChange={onSelectedRowsChange}
            clearSelectedRows={clear}
          />
        </Col>
        {editOrder && (
          <EditOrderContainer
            order={editOrder}
            show={!!editOrder}
            onHide={() => setEditOrder(null)}
          />
        )}
      </Loader>
    </Col>
  );
}

export default OrderList;
