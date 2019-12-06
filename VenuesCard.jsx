import React from "react";
import PropTypes from "prop-types";
import "./Venues.css";

const VenueCard = props => {
  const handleEdit = () => {
    props.onHandleEditVenue(props.venue);
  };
  const handleDetails = () => {
    props.onHandleMoreDetails(props.venue);
  };

  return (
    <React.Fragment>
      <div
        className="col-md-3 card height-equal ml-2 mt-2"
        style={{ minHeight: 337 }}
      >
        <div className="card-header">
          <h6>{props.venue.name}</h6>
        </div>
        <div className="card-body">
          <img
            src={props.venue.venueImage.imageUrl}
            className="card-img col-container"
            alt=""
          ></img>
          <div className="max-lines">
            <p> {props.venue.description}. </p>
          </div>
          <button
            type="button"
            className="detailsBtn btn-dark btn-sm"
            onClick={handleDetails}
          >
            More Details
          </button>
        </div>
        <div className="card-footer">
          <h6 className="mb-0">
            <a href={props.venue.url}>Website</a>
          </h6>
          <button
            type="button"
            className="editBtn btn-danger btn-sm"
            onClick={handleEdit}
            style={{ float: "right" }}
          >
            Edit
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

VenueCard.propTypes = {
  venue: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    locationId: PropTypes.number,
    venueImage: PropTypes.shape({
      imageUrl: PropTypes.string
    })
  }),
  onHandleEditVenue: PropTypes.func,
  onHandleMoreDetails: PropTypes.func
};

export default VenueCard;
