import React from "react";
import logger from "sabio-debug";
import * as venuesServices from "../../services/venuesServices";
import VenueCard from "./VenueCards";
import PropTypes from "prop-types";
import Pagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";

class Venues extends React.Component {
  state = {
    venue: [],
    mappedVenue: [],
    venueData: {
      id: " ",
      name: " ",
      description: " ",
      locationId: " ",
      url: " ",
      createdBy: " ",
      modifiedBy: " ",
      dateCreated: " ",
      dateModified: " ",
      venueImage: []
    },
    current: 1
  };

  componentDidMount() {
    _logger("componentDidMount good");
    this.getVenues(0);
  }
  getVenues = current => {
    venuesServices
      .getAllVenues(current, 6)
      .then(this.onGetVenuesSuccess)
      .catch(this.onGetVenuesError);
  };

  onGetVenuesSuccess = resData => {
    let venue = resData.item.pagedItems;
    this.setState({
      mappedVenue: venue.map(this.mapVenue),
      currentItems: resData.item.totalCount
    });
  };

  onGetVenuesError = response => {
    _logger(response);
  };

  mapVenue = data => (
    <VenueCard
      mappedVenue={this.state.mappedVenue}
      key={data.id}
      venue={data}
      onHandleEditVenue={this.onHandleEditVenue}
      onHandleMoreDetails={this.onHandleMoreDetails}
    />
  );

  onHandleEditVenue = venue => {
    _logger(venue);
    this.props.history.push("/venues/" + venue.id + "/edit", venue);
  };

  onHandleMoreDetails = venue => {
    this.props.history.push("/venues/" + venue.id + "/details", venue);
  };

  onPageChange = page => {
    this.setState(
      prevState => {
        return {
          ...prevState,
          current: page
        };
      },
      () => {
        this.getVenues(page - 1);
      }
    );
  };
  handleCreate = () => {
    this.props.history.push("/venues/create");
  };

  render() {
    return (
      <React.Fragment>
        <button
          type="button"
          className="createBtn btn-dark btn-sm"
          onClick={this.handleCreate}
          style={{ float: "right" }}
        >
          Create Venue
        </button>
        <div className="row">{this.state.mappedVenue}</div>
        <div>
          <Pagination
            style={{ margin: "center" }}
            defaultPageSize={6}
            defaultCurrent={1}
            onChange={this.onPageChange}
            current={this.state.current}
            total={this.state.currentItems}
            locale={localeInfo}
          />
        </div>
      </React.Fragment>
    );
  }
}
Venues.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func })
};

export default Venues;
