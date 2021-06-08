import { ChangeEvent, Component } from "react";
import "./App.css";
import { MissionComponent } from "./components/Mission/Mission.component";
import { ILaunchSite, IMission, IRocket } from "./interfaces";
import { DataService } from "./services";

interface Props {}

interface State {
  selectedMissions: IMission[];
  launchSites: ILaunchSite[];
  rockets: IRocket[];
  selectedSiteId: string;
  selectedRocketId: string;
}

class App extends Component<Props, State> {
  public state: State = {
    selectedMissions: [],
    launchSites: [],
    rockets: [],
    selectedSiteId: "",
    selectedRocketId: "",
  };

  private missions: IMission[] = [];

  private dataService: DataService;

  constructor(props: Props) {
    super(props);
    this.dataService = DataService.instance;
    this.handleSiteChange = this.handleSiteChange.bind(this);
    this.handleRocketChange = this.handleRocketChange.bind(this);
  }

  public async componentDidMount(): Promise<void> {
    const missions = await this.dataService.fetchLaunches();
    this.missions = missions;
    const launchSites = new Map<string, ILaunchSite>();
    launchSites.set("all", { site_id: "", site_name: "all" });
    missions.forEach((mission) => {
      launchSites.set(mission.launch_site.site_id, mission.launch_site);
    });

    const rockets = new Map<string, IRocket>();

    rockets.set("all", { rocket_id: "", rocket_name: "all" });
    missions.forEach((mission) => {
      rockets.set(mission.rocket.rocket_id, mission.rocket);
    });

    this.setState({
      selectedMissions: missions,
      rockets: Array.from(rockets.values()),
      launchSites: Array.from(launchSites.values()),
    });
  }

  public render() {
    return (
      <div className="app">
        <div className="header">
          <div className="title">Launches</div>
          <div className="controls">
            <div>
              <div>Launch sites</div>
              <select
                name=""
                id=""
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  this.handleSiteChange(event)
                }
              >
                {this.state.launchSites.map((item, index) => (
                  <option value={item.site_id} key={index}>
                    {item.site_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <div>Rockets</div>
              <select
                name=""
                id=""
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  this.handleRocketChange(event)
                }
              >
                {this.state.rockets.map((item, index) => (
                  <option value={item.rocket_id} key={index}>
                    {item.rocket_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="content">
          {this.state.selectedMissions.map((item, index) => (
            <MissionComponent mission={item} key={index} />
          ))}
        </div>
      </div>
    );
  }

  private handleSiteChange(event: ChangeEvent<HTMLSelectElement>): void {
    const id = event.target.value;
    const missions = this.missions.filter((item) =>
      id ? item.launch_site.site_id === id : true
    );

    this.setState({
      selectedSiteId: event.target.value,
      selectedMissions: missions.filter((item) =>
        this.state.selectedRocketId
          ? item.rocket.rocket_id === this.state.selectedRocketId
          : true
      ),
    });
  }

  private handleRocketChange(event: ChangeEvent<HTMLSelectElement>): void {
    const id = event.target.value;

    const missions = this.missions.filter((item) =>
      id ? item.rocket.rocket_id === id : true
    );

    this.setState({
      selectedRocketId: id,
      selectedMissions: missions.filter((item) =>
        this.state.selectedSiteId
          ? item.launch_site.site_id === this.state.selectedSiteId
          : true
      ),
    });
  }
}

export default App;
