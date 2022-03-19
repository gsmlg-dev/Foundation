package geoip2

const defaultLang = "en"

func getNameByLang(n map[string]string, l string) string {
	if len(n) == 0 {
		return ""
	}
	if val, ok := n[l]; ok {
		return val
	}
	if val, ok := n[defaultLang]; ok {
		return val
	}
	return ""
}

func ProduceCity(c *City, lang string) map[string]interface{} {
	cc := *c
	var out map[string]interface{}

	out["city"] = getNameByLang(cc.City.Names, lang)
	out["continent"] = getNameByLang(cc.Continent.Names, lang)
	out["country"] = getNameByLang(cc.Country.Names, lang)

	out["latitude"] = cc.Location.Latitude
	out["longitude"] = cc.Location.Longitude
	out["accuracyRadius"] = cc.Location.AccuracyRadius

	out["postCode"] = cc.Postal.Code

	out["registeredCountry"] = getNameByLang(cc.RegisteredCountry.Names, lang)

	return out
}
