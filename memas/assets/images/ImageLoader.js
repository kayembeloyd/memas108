const correctiveMaintenance = require("./corrective-maintenance.jpg");
const maintenanceSchedule = require("./maintenance-schedule.jpg");
const equipment = require("./equipment.jpg");
const preventiveMaintenance = require("./preventive-maintenance.jpg");
const maintenanceLogs = require("./maintenance-logs.jpg");

export default function getImage(name) {
  switch (name) {
    case "preventive-maintenance":
      return preventiveMaintenance;
    case "corrective-maintenance":
      return correctiveMaintenance;
    case "maintenance-schedule":
      return maintenanceSchedule;
    case "equipment":
      return equipment;
    case "maintenance-logs":
      return maintenanceLogs;
    default:
      break;
  }
}
