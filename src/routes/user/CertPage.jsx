import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

// My components
import Cert from "../../components/user/Cert";
import SecCard from "../../components/user/SecCard";

// My css
import "../../css/user/u-cert-page.css";

// My assets
import yi_logo from "../../assets/images/yi_logo.png";
import yuva_logo from "../../assets/images/yuva_logo.png";
import cii_logo from "../../assets/images/cii_logo.jpg";
import trophy_logo from "../../assets/images/trophy_logo.jpg";
import sign from "../../assets/images/sign.png";
import { downloadCertificate } from "../../utilities/helper_functions";

import { SERVER_ORIGIN } from "../../utilities/constants";

const CertPage = () => {
  const [certInfo, setCertInfo] = useState({
    holderName: "",
    passingDate: "",
    courseName: "",
    unitId: "",
  });
  const [URL, setUrl] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  // console.log(params);

  useEffect(() => {
    const getCert = async () => {
      setIsLoading(true);
      const certId = params.certId;
      try {
        const response = await fetch(
          `${SERVER_ORIGIN}/api/public/certificate/${certId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();
        console.log(result);

        if (response.status >= 400 && response.status < 600) {
          if (response.status === 404) {
            // invalid cert id
          } else {
            alert("Internal server error"); // todo: toast notify
          }
        } else if (response.ok && response.status === 200) {
          setCertInfo(result.certInfo);
        } else {
          // for future
        }
        setUrl(window.location.href);
        console.log("hererer: ", window.location.href);

        setIsLoading(false);
      } catch (err) {
        console.log(err.message);
        setIsLoading(false);
      }
    };

    getCert();
  }, []);

  const handleCertPDFDownload = () => {
    // console.log("downloading");

    downloadCertificate();
  };


  return (
    <div className="cert-page-outer-div">
      <div className="row">
        <div className="col-lg-8">
          <div>
            <Cert certInfo={certInfo} />
          </div>
          <div style={{ marginTop: "2rem", marginBottom: "10rem" }}>
            <SecCard>
              <p className="text-ff2" style={{ margin: "0" }}>
                This certificate above verifies that{" "}
                <span className="text-underline">{certInfo.holderName}</span>{" "}
                successfully completed the course{" "}
                <span className="text-underline">{certInfo.courseName}</span> on{" "}
                <span className="text-underline">{certInfo.passingDate}</span>{" "}
                on Yuva Portal. The certificate indicates the entire course was
                completed as validated by the student.
              </p>
            </SecCard>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="cert-page-cert-info-div">
            <p className="cert-page-holder-text">Certificate holder name:</p>
            <h3 className="cert-page-holder-name">{certInfo.holderName}</h3>

            <p className="cert-page-holder-text">Course name:</p>
            <h3 className="cert-page-holder-name">{certInfo.courseName}</h3>

            <hr></hr>

            <button
              className="cert-page-cert-download-btn"
              onClick={handleCertPDFDownload}
            >
              Download PDF
            </button>
            <p className="cert-page-share-text text-ff2 text-center">
              Or share on
            </p>
            <div className="cert-page-share-btns-div">
              <LinkedinShareButton url={URL}>
                <LinkedinIcon
                  className="cert-page-share-icon"
                  size={55}
                  round={true}
                />
              </LinkedinShareButton>

              <FacebookShareButton url={URL}>
                <FacebookIcon
                  className="cert-page-share-icon"
                  size={55}
                  round={true}
                />
              </FacebookShareButton>

              <TwitterShareButton url={URL}>
                <TwitterIcon
                  className="cert-page-share-icon"
                  size={55}
                  round={true}
                />
              </TwitterShareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertPage;
