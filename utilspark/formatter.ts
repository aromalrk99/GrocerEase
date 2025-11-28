export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)
}

export const formatRating = (rating: number) => {
  return rating.toFixed(1)
}

export const formatExperience = (years: number) => {
  return `${years}+ years`
}

export const formatArea = (area: string) => {
  return area
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export const truncateText = (text: string, length: number) => {
  return text.length > length ? text.substring(0, length) + "..." : text
}
