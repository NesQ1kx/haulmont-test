import { Component } from "react";
import { IMission } from "../../interfaces";
import "./Mission.component.css";

interface Props {
  mission: IMission;
}

interface State {
  date: string;
}

export class MissionComponent extends Component<Props, State> {
  public state: State = {
    date: "",
  };

  public componentDidMount() {
    const date = new Date(this.props.mission.launch_date_unix * 1000);
    this.setState({
      date: `${date.getDate()}.${date.getMonth()}.${date.getUTCFullYear()}`,
    });
  }

  public render() {
    return (
      <div className="mission">
        <img
          className="image"
          src={this.props.mission.links.mission_patch_small}
        />
        <div className="details">
          <div className="head">
            <div className="name">{this.props.mission.mission_name}</div>
            <div className="date">{this.state.date}</div>
          </div>
          <div className="description">
            {this.props.mission.details || "Upcoming"}
          </div>
        </div>
      </div>
    );
  }
}
