import {
    UserGroupIcon,
    UserAdd01Icon,
    Activity01Icon,
} from "hugeicons-react";

export const getIcon = (iconName) => {
    switch (iconName) {
        case "employees":
            return UserGroupIcon;
        case "add-employee":
            return UserAdd01Icon;
        case "audit":
            return Activity01Icon;
        default:
            return UserGroupIcon;
    }
};
