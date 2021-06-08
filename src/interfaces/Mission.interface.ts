import { ILaunchSite } from "./LaunchSite.interface";
import { IRocket } from "./Rocket.interface";

export interface IMission {
  mission_name: string;
  links: {
    mission_patch_small: string;
  };
  launch_date_unix: number;
  details: string;
  rocket: IRocket;
  launch_site: ILaunchSite;
}
