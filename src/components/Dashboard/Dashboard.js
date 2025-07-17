import React from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  Button,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner
} from "reactstrap";
import { Line, Bar } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { getLineChartData, getBarChartData } from "../../variables/charts";

const Dashboard = ({
  loading,
  selectedMonth,
  setSelectedMonth,
  filteredEvaluations,
  paginatedUsers,
  paginatedQuestions,
  totalUserPages,
  totalQuestionPages,
  currentUserPage,
  setCurrentUserPage,
  currentQuestionPage,
  setCurrentQuestionPage,
  chartOptions
}) => {
  const navigate = useNavigate();

  const renderPagination = (totalPages, currentPage, setPage) => (
    <Pagination>
      {Array.from({ length: totalPages }, (_, i) => (
        <PaginationItem active={i + 1 === currentPage} key={i}>
          <PaginationLink onClick={() => setPage(i + 1)}>{i + 1}</PaginationLink>
        </PaginationItem>
      ))}
    </Pagination>
  );

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner color="primary" />
      </div>
    );
  }

  return (
    <>
      <Row className="mb-3">
        <Col md="4">
          <Input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </Col>
      </Row>

      <Row>
        <Col xl="6">
          <Card className="shadow mb-4 card-hover">
            <CardHeader className="bg-transparent">
              <h3 className="mb-0 card-title">
                <i className="ni ni-chart-bar-32 text-primary mr-2" />
                Notes des 8 dernières évaluations
              </h3>
            </CardHeader>
            <CardBody>
              <div className="chart">
                <Line data={getLineChartData(filteredEvaluations)} options={chartOptions} />
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl="6">
          <Card className="shadow mb-4 card-hover">
            <CardHeader className="bg-transparent">
              <h3 className="mb-0 card-title">
                <i className="ni ni-chart-pie-35 text-success mr-2" />
                Moyenne mensuelle des évaluations
              </h3>
            </CardHeader>
            <CardBody>
              <div className="chart">
                <Bar data={getBarChartData(filteredEvaluations)} options={chartOptions} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xl="6">
          <Card className="shadow mb-4 card-hover">
            <CardHeader className="bg-transparent d-flex justify-content-between align-items-center">
              <h3 className="mb-0 card-title">
                <i className="ni ni-single-02 text-info mr-2" />
                Utilisateurs
              </h3>
              <Button color="primary" size="sm" onClick={() => navigate("/admin/Users")}>
                Voir plus
              </Button>
            </CardHeader>
            <CardBody>
              <Table responsive className="table-flush">
                <thead className="thead-light">
                  <tr>
                    <th>Matricule</th>
                    <th>Nom</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map(user => (
                    <tr key={user.id}>
                      <td><span className="badge badge-light">{user.matricule}</span></td>
                      <td>{user.nom} {user.prenom}</td>
                      <td><span className="badge badge-light">{user.email}</span></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-flex justify-content-center mt-3">
                {renderPagination(totalUserPages, currentUserPage, setCurrentUserPage)}
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col xl="6">
          <Card className="shadow mb-4 card-hover">
            <CardHeader className="bg-transparent d-flex justify-content-between align-items-center">
              <h3 className="mb-0 card-title">
                <i className="ni ni-bullet-list-67 text-warning mr-2" />
                Questions
              </h3>
              <Button color="primary" size="sm" onClick={() => navigate("/admin/user-profile")}>
                Voir plus
              </Button>
            </CardHeader>
            <CardBody>
              <Table responsive className="table-flush">
                <thead className="thead-light">
                  <tr>
                    <th>Nom</th>
                    <th>Description</th>
                    <th>Note Max</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedQuestions.map(q => (
                    <tr key={q.id}>
                      <td>{q.nom}</td>
                      <td>{q.description}</td>
                      <td><span className="badge badge-light">{q.noteMax}</span></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-flex justify-content-center mt-3">
                {renderPagination(totalQuestionPages, currentQuestionPage, setCurrentQuestionPage)}
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
