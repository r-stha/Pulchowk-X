const LOCATION_ICON_URLS: Record<string, string> = {
  "custom-marker":
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  "bank-icon":
    "https://png.pngtree.com/png-clipart/20230805/original/pngtree-bank-location-icon-from-business-bicolor-set-money-business-company-vector-picture-image_9698988.png",
  "food-icon": "https://cdn-icons-png.freepik.com/512/11167/11167112.png",
  "library-icon": "https://cdn-icons-png.freepik.com/512/7985/7985904.png",
  "dept-icon": "https://cdn-icons-png.flaticon.com/512/7906/7906888.png",
  "temple-icon": "https://cdn-icons-png.flaticon.com/512/1183/1183391.png",
  "gym-icon": "https://cdn-icons-png.flaticon.com/512/11020/11020519.png",
  "football-icon": "https://cdn-icons-png.freepik.com/512/8893/8893610.png",
  "cricket-icon": "https://i.postimg.cc/cLb6QFC1/download.png",
  "hostel-icon": "https://cdn-icons-png.flaticon.com/512/7804/7804352.png",
  "volleyball-icon": "https://i.postimg.cc/mDW05pSw-/volleyball.png",
  "lab-icon": "https://cdn-icons-png.flaticon.com/256/12348/12348567.png",
  "parking-icon":
    "https://cdn.iconscout.com/icon/premium/png-256-thumb/parking-place-icon-svg-download-png-897308.png",
  "helipad-icon": "https://cdn-icons-png.flaticon.com/512/5695/5695654.png",
  "electrical-icon": "https://cdn-icons-png.flaticon.com/512/9922/9922144.png",
  "music-icon": "https://cdn-icons-png.flaticon.com/512/5905/5905923.png",
  "energy-icon": "https://cdn-icons-png.flaticon.com/512/10053/10053795.png",
  "helm-icon":
    "https://png.pngtree.com/png-vector/20221130/ourmid/pngtree-airport-location-pin-in-light-blue-color-png-image_6485369.png",
  "garden-icon": "https://cdn-icons-png.flaticon.com/512/15359/15359437.png",
  "store-icon": "https://cdn-icons-png.flaticon.com/512/3448/3448673.png",
  "quarter-icon": "https://static.thenounproject.com/png/331579-200.png",
  "robotics-icon": "https://cdn-icons-png.flaticon.com/512/10681/10681183.png",
  "clinic-icon": "https://cdn-icons-png.flaticon.com/512/10714/10714002.png",
  "badminton-icon": "https://static.thenounproject.com/png/198230-200.png",
  "entrance-icon": "https://i.postimg.cc/jjLDcb6p/image-removebg-preview.png",
  "office-icon": "https://cdn-icons-png.flaticon.com/512/3846/3846807.png",
  "building-icon": "https://cdn-icons-png.flaticon.com/512/5193/5193760.png",
  "block-icon": "https://cdn-icons-png.flaticon.com/512/3311/3311565.png",
  "cave-icon": "https://cdn-icons-png.flaticon.com/512/210/210567.png",
  "fountain-icon":
    "https://cdn.iconscout.com/icon/free/png-256/free-fountain-icon-svg-download-png-449881.png",
  "water-vending-machine-icon":
    "https://static.vecteezy.com/system/resources/thumbnails/044/570/540/small_2x/single-water-drop-on-transparent-background-free-png.png",
  "workshop-icon": "https://cdn-icons-png.flaticon.com/512/7258/7258548.png",
  "toilet-icon":
    "https://png.pngtree.com/png-clipart/20240426/ourmid/pngtree-yellow-male-sign-for-toilet-washroom-png-image_12330179.png",
  "bridge-icon": "https://static.thenounproject.com/png/5954264-200.png",
};

export function inferLocationIconName(text: string) {
  const desc = (text ?? "").toLowerCase();

  if (desc.includes("bank") || desc.includes("atm")) return "bank-icon";
  if (desc.includes("mess") || desc.includes("canteen") || desc.includes("food")) return "food-icon";
  if (desc.includes("library")) return "library-icon";
  if (desc.includes("department")) return "dept-icon";
  if (desc.includes("mandir")) return "temple-icon";
  if (desc.includes("gym") || desc.includes("sport")) return "gym-icon";
  if (desc.includes("football")) return "football-icon";
  if (desc.includes("cricket")) return "cricket-icon";
  if (desc.includes("basketball") || desc.includes("volleyball")) return "volleyball-icon";
  if (desc.includes("hostel")) return "hostel-icon";
  if (desc.includes("lab")) return "lab-icon";
  if (desc.includes("helicopter")) return "helipad-icon";
  if (desc.includes("parking")) return "parking-icon";
  if (desc.includes("electrical club")) return "electrical-icon";
  if (desc.includes("music club")) return "music-icon";
  if (desc.includes("center for energy studies")) return "energy-icon";
  if (desc.includes("the helm of ioe pulchowk")) return "helm-icon";
  if (desc.includes("pi chautari") || desc.includes("park") || desc.includes("garden")) return "garden-icon";
  if (desc.includes("store") || desc.includes("bookshop")) return "store-icon";
  if (desc.includes("quarter")) return "quarter-icon";
  if (desc.includes("robotics club")) return "robotics-icon";
  if (desc.includes("clinic") || desc.includes("health")) return "clinic-icon";
  if (desc.includes("badminton")) return "badminton-icon";
  if (desc.includes("entrance")) return "entrance-icon";
  if (desc.includes("office") || desc.includes("ntbns") || desc.includes("seds") || desc.includes("cids")) return "office-icon";
  if (desc.includes("building")) return "building-icon";
  if (desc.includes("block") || desc.includes("embark")) return "block-icon";
  if (desc.includes("cave")) return "cave-icon";
  if (desc.includes("fountain")) return "fountain-icon";
  if (desc.includes("water vending machine") || desc.includes("water")) return "water-vending-machine-icon";
  if (desc.includes("workshop")) return "workshop-icon";
  if (desc.includes("toilet") || desc.includes("washroom")) return "toilet-icon";
  if (desc.includes("bridge")) return "bridge-icon";
  return "custom-marker";
}

type LocationLike = {
  icon?: string | null;
  name?: string | null;
  description?: string | null;
  services?: Array<{ name?: string | null; purpose?: string | null }>;
};

export function resolveLocationIconName(location: LocationLike) {
  const serviceText = (location.services ?? [])
    .flatMap((service) => [service?.name, service?.purpose])
    .filter(Boolean)
    .join(" ");

  const inferred = inferLocationIconName(
    [location.name, location.description, serviceText].filter(Boolean).join(" "),
  );

  if (location.icon && location.icon !== "custom-marker") return location.icon;
  return inferred;
}

export function getLocationIconUrl(iconName?: string | null) {
  if (!iconName) return LOCATION_ICON_URLS["custom-marker"];
  return LOCATION_ICON_URLS[iconName] ?? LOCATION_ICON_URLS["custom-marker"];
}

export function getLocationIconUrlFor(location: LocationLike) {
  return getLocationIconUrl(resolveLocationIconName(location));
}
