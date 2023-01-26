export default class MiddleMan {
  static API_ADDRESS = "http://192.168.0.39/memas108api";

  static async equipment(page, size) {
    const equipmentAsync = async (page, size) => {
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

    return await equipmentAsync(page, size);
  }

  static async equipmentNew(equipment) {
    const equipmentNewAsync = async (equipment) => {
      try {
        var modEquip = {
          ...equipment,
          technicalSpecifications: JSON.stringify(
            equipment.technicalSpecifications
          ),
        };

        const response = await fetch(this.API_ADDRESS + "/equipment", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body: new URLSearchParams(modEquip).toString(),
        });

        return await response.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    return await equipmentNewAsync(equipment);
  }

  static async department(id) {
    const departmentAsync = async (id) => {
      try {
        const response = await fetch("");
        return await response.json();
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    return await departmentAsync(id);
  }
}
