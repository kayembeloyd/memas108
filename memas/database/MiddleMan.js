export default class MiddleMan {
  static API_ADDRESS = "http://192.168.0.39/memas108api";

  static async equipment(page, size) {
    const iasync = async (page, size) => {
      try {
        const response = await fetch(
          this.API_ADDRESS + "/equipment?page=" + page + "&size=" + size
        );

        return await response.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    return await iasync(page, size);
  }

  static async equipmentGet(assetTag) {
    const iasync = async (assetTag) => {
      try {
        const response = await fetch(
          this.API_ADDRESS + "/equipment/" + assetTag
        );

        return await response.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    return await iasync(assetTag);
  }

  static async equipmentNew(equipment) {
    const iasync = async (item) => {
      try {
        var modItem = {
          ...item,
          technicalSpecifications: JSON.stringify(item.technicalSpecifications),
        };

        const response = await fetch(this.API_ADDRESS + "/equipment", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: new URLSearchParams(modItem).toString(),
        });

        return await response.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    return await iasync(equipment);
  }
  W;
  static async equipmentUpdate(equipment) {
    const iasync = async (item) => {
      try {
        var modItem = {
          ...item,
          technicalSpecifications: JSON.stringify(item.technicalSpecifications),
        };

        const response = await fetch(this.API_ADDRESS + "/equipment/update", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: new URLSearchParams(modItem).toString(),
        });

        return await response.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    return await iasync(equipment);
  }

  static async departments() {
    const iasync = async () => {
      return [
        { id: 1, name: "TB Ward", uploaded: 0 },
        { id: 2, name: "Female Ward", uploaded: 0 },
        { id: 3, name: "Male Ward", uploaded: 0 },
        { id: 4, name: "Postnatal Ward", uploaded: 0 },
        { id: 5, name: "Labor Ward", uploaded: 0 },
        { id: 6, name: "Nursery Ward", uploaded: 0 },
        { id: 7, name: "HDU", uploaded: 0 },
        { id: 8, name: "Major Operating Theatre", uploaded: 0 },
        { id: 9, name: "Antenatal Ward", uploaded: 0 },
        { id: 10, name: "Paediatric Ward", uploaded: 0 },
        { id: 11, name: "Laboratory", uploaded: 0 },
        { id: 12, name: "Minor Theatre", uploaded: 0 },
        { id: 13, name: "Radiology", uploaded: 0 },
        { id: 15, name: "OPD (Dental)", uploaded: 0 },
        { id: 16, name: "OPD (ENT)", uploaded: 0 },
        { id: 17, name: "OPD (Skin)", uploaded: 0 },
        { id: 18, name: "OPD (General)", uploaded: 0 },
        { id: 19, name: "Under 5 Clinic", uploaded: 0 },
      ];
    };

    return await iasync();
  }

  static async departmentGet(id) {
    const iasync = async (id) => {
      const departments = await this.departments();

      return departments.find((department) => {
        return department.id == id;
      });
    };

    return iasync(id);
  }

  static async maintenanceLogNew(maintenanceLog) {
    const iasync = async (item) => {
      try {
        var modItem = {
          ...item,
          maintenanceLogData: JSON.stringify(item.maintenanceLogData),
        };

        const response = await fetch(this.API_ADDRESS + "/maintenance-logs", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: new URLSearchParams(modItem).toString(),
        });

        return await response.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    return await iasync(maintenanceLog);
  }

  static async maintenanceLogs(page, size) {
    const iasync = async (page, size) => {
      try {
        const response = await fetch(
          this.API_ADDRESS + "/maintenance-logs?page=" + page + "&size=" + size
        );

        return await response.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    return await iasync(page, size);
  }

  static async maintenanceSchedule(page, size, nowDate) {
    const iasync = async (page, size) => {
      try {
        const response = await fetch(
          this.API_ADDRESS +
            "/maintenance-schedule?page=" +
            page +
            "&size=" +
            size +
            "&nowDate=" +
            nowDate
        );

        return await response.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    return await iasync(page, size);
  }

  static async maintenanceOverdueSchedule(page, size, nowDate) {
    const iasync = async (page, size) => {
      try {
        const response = await fetch(
          this.API_ADDRESS +
            "/maintenance-schedule?page=" +
            page +
            "&size=" +
            size +
            "&nowDate=" +
            nowDate +
            "&overdue=true"
        );

        return await response.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    return await iasync(page, size);
  }

  static async userGet(id) {
    const iasync = async (id) => {
      return {
        id: 0,
        username: "kayembeloyd",
        avatarId: 0,
        name: "Lloyd Kayembe",
        position: "Biomedical Engineer",
      };
    };

    return await iasync(id);
  }
}
