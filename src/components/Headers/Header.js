
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { getUserCount } from "../../services/userService";
import { getGareCount } from "../../services/stationService";
import { getEvaluationCount } from "../../services/evaluationService";
import { countUserEvaluations } from "../../services/userEvaluationService";

import React, { useState, useEffect } from "react";
import "../../assets/css/header.css";

const Header = () => {

  const [userCount, setUserCount] = useState(null);
  const [gareCount, setGareCount] = useState(null);
  const [evaluationCount, setEvaluationCount] = useState(null);
  const [criteriaCount, setCriteriaCount] = useState(null);


  useEffect(() => {
    const fetchUserCount = async () => {
      const count = await getUserCount();
      setUserCount(count);
    };

    fetchUserCount(); // Appel à l'API dès que le composant est monté
  }, []);

  useEffect(() => {
    const fetchGareCount = async () => {
      const count = await getGareCount();
      setGareCount(count);
    };

    fetchGareCount(); // Appel à l'API dès que le composant est monté
  }
  , []);

useEffect(() => {
  const fetchEvaluationCount = async () => {
    const count = await countUserEvaluations();
    setEvaluationCount(count);
  };
  fetchEvaluationCount();
}, []);

useEffect(() => {
  const fetchCriteriaCount = async () => {
    const count = await getEvaluationCount();
    setCriteriaCount(count);
  };
  fetchCriteriaCount();
}, []);



  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Utilisateurs
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {userCount !== null ? userCount : "Chargement..."}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-user-friends" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Gares
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {gareCount !== null ? gareCount : "Chargement..."}
                        </span>
                        

                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Criteria
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {criteriaCount !== null ? criteriaCount : "Chargement..."}
                        </span>

                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-users " />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Evaluations
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {evaluationCount !== null ? evaluationCount : "Chargement..."}
                        </span>

                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                    <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
