package geoip2

const defaultLang = "en"

func getNameByLang(n map[string]string, l string) string {
	if n == nil {
		return ""
	}
	s := n[lang]
	if s != nil {
		return s
	}
	d := n[defaultLang]
	if d != nil {
		return d
	}
	return ""
}

func ProduceCity(c *City, lang string) map[string]interface{} {
	var out map[string]interface{}
	out["city"] = getNameByLang(c.City.Names, lang)
	out["continent"] = getNameByLang(c.Continent.Names, lang)
	out["country"] = getNameByLang(c.Country.Names, lang)

	out["latitude"] = c.Location.Latitude
	out["longitude"] = c.Location.Longitude
	out["accuracyRadius"] = c.Location.AccuracyRadius

	out["postCode"] = c.Postal.Code

	out["registeredCountry"] = getNameByLang(c.RegisteredCountry.Names, lang)

	return out
}
