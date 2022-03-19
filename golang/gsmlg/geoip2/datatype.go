package geoip2

// The Enterprise struct corresponds to the data in the GeoIP2 Enterprise
// database.
type Enterprise struct {
	City struct {
		Confidence uint8             `maxminddb:"confidence"`
		GeoNameID  uint              `maxminddb:"geoname_id"`
		Names      map[string]string `maxminddb:"names"`
	} `maxminddb:"city"`
	Continent struct {
		Code      string            `maxminddb:"code"`
		GeoNameID uint              `maxminddb:"geoname_id"`
		Names     map[string]string `maxminddb:"names"`
	} `maxminddb:"continent"`
	Country struct {
		GeoNameID         uint              `maxminddb:"geoname_id"`
		IsoCode           string            `maxminddb:"iso_code"`
		Names             map[string]string `maxminddb:"names"`
		Confidence        uint8             `maxminddb:"confidence"`
		IsInEuropeanUnion bool              `maxminddb:"is_in_european_union"`
	} `maxminddb:"country"`
	Location struct {
		AccuracyRadius uint16  `maxminddb:"accuracy_radius"`
		Latitude       float64 `maxminddb:"latitude"`
		Longitude      float64 `maxminddb:"longitude"`
		MetroCode      uint    `maxminddb:"metro_code"`
		TimeZone       string  `maxminddb:"time_zone"`
	} `maxminddb:"location"`
	Postal struct {
		Code       string `maxminddb:"code"`
		Confidence uint8  `maxminddb:"confidence"`
	} `maxminddb:"postal"`
	RegisteredCountry struct {
		GeoNameID         uint              `maxminddb:"geoname_id"`
		IsoCode           string            `maxminddb:"iso_code"`
		Names             map[string]string `maxminddb:"names"`
		Confidence        uint8             `maxminddb:"confidence"`
		IsInEuropeanUnion bool              `maxminddb:"is_in_european_union"`
	} `maxminddb:"registered_country"`
	RepresentedCountry struct {
		GeoNameID         uint              `maxminddb:"geoname_id"`
		IsInEuropeanUnion bool              `maxminddb:"is_in_european_union"`
		IsoCode           string            `maxminddb:"iso_code"`
		Names             map[string]string `maxminddb:"names"`
		Type              string            `maxminddb:"type"`
	} `maxminddb:"represented_country"`
	Subdivisions []struct {
		Confidence uint8             `maxminddb:"confidence"`
		GeoNameID  uint              `maxminddb:"geoname_id"`
		IsoCode    string            `maxminddb:"iso_code"`
		Names      map[string]string `maxminddb:"names"`
	} `maxminddb:"subdivisions"`
	Traits struct {
		AutonomousSystemNumber       uint    `maxminddb:"autonomous_system_number"`
		AutonomousSystemOrganization string  `maxminddb:"autonomous_system_organization"`
		ConnectionType               string  `maxminddb:"connection_type"`
		Domain                       string  `maxminddb:"domain"`
		IsAnonymousProxy             bool    `maxminddb:"is_anonymous_proxy"`
		IsLegitimateProxy            bool    `maxminddb:"is_legitimate_proxy"`
		IsSatelliteProvider          bool    `maxminddb:"is_satellite_provider"`
		ISP                          string  `maxminddb:"isp"`
		MobileCountryCode            string  `maxminddb:"mobile_country_code"`
		MobileNetworkCode            string  `maxminddb:"mobile_network_code"`
		Organization                 string  `maxminddb:"organization"`
		StaticIPScore                float64 `maxminddb:"static_ip_score"`
		UserType                     string  `maxminddb:"user_type"`
	} `maxminddb:"traits"`
}

// The City struct corresponds to the data in the GeoIP2/GeoLite2 City
// databases.
type City struct {
	City struct {
		GeoNameID uint              `maxminddb:"geoname_id"`
		Names     map[string]string `maxminddb:"names"`
	} `maxminddb:"city"`
	Continent struct {
		Code      string            `maxminddb:"code"`
		GeoNameID uint              `maxminddb:"geoname_id"`
		Names     map[string]string `maxminddb:"names"`
	} `maxminddb:"continent"`
	Country struct {
		GeoNameID         uint              `maxminddb:"geoname_id"`
		IsInEuropeanUnion bool              `maxminddb:"is_in_european_union"`
		IsoCode           string            `maxminddb:"iso_code"`
		Names             map[string]string `maxminddb:"names"`
	} `maxminddb:"country"`
	Location struct {
		AccuracyRadius uint16  `maxminddb:"accuracy_radius"`
		Latitude       float64 `maxminddb:"latitude"`
		Longitude      float64 `maxminddb:"longitude"`
		MetroCode      uint    `maxminddb:"metro_code"`
		TimeZone       string  `maxminddb:"time_zone"`
	} `maxminddb:"location"`
	Postal struct {
		Code string `maxminddb:"code"`
	} `maxminddb:"postal"`
	RegisteredCountry struct {
		GeoNameID         uint              `maxminddb:"geoname_id"`
		IsInEuropeanUnion bool              `maxminddb:"is_in_european_union"`
		IsoCode           string            `maxminddb:"iso_code"`
		Names             map[string]string `maxminddb:"names"`
	} `maxminddb:"registered_country"`
	RepresentedCountry struct {
		GeoNameID         uint              `maxminddb:"geoname_id"`
		IsInEuropeanUnion bool              `maxminddb:"is_in_european_union"`
		IsoCode           string            `maxminddb:"iso_code"`
		Names             map[string]string `maxminddb:"names"`
		Type              string            `maxminddb:"type"`
	} `maxminddb:"represented_country"`
	Subdivisions []struct {
		GeoNameID uint              `maxminddb:"geoname_id"`
		IsoCode   string            `maxminddb:"iso_code"`
		Names     map[string]string `maxminddb:"names"`
	} `maxminddb:"subdivisions"`
	Traits struct {
		IsAnonymousProxy    bool `maxminddb:"is_anonymous_proxy"`
		IsSatelliteProvider bool `maxminddb:"is_satellite_provider"`
	} `maxminddb:"traits"`
}

// The Country struct corresponds to the data in the GeoIP2/GeoLite2
// Country databases.
type Country struct {
	Continent struct {
		Code      string            `maxminddb:"code"`
		GeoNameID uint              `maxminddb:"geoname_id"`
		Names     map[string]string `maxminddb:"names"`
	} `maxminddb:"continent"`
	Country struct {
		GeoNameID         uint              `maxminddb:"geoname_id"`
		IsInEuropeanUnion bool              `maxminddb:"is_in_european_union"`
		IsoCode           string            `maxminddb:"iso_code"`
		Names             map[string]string `maxminddb:"names"`
	} `maxminddb:"country"`
	RegisteredCountry struct {
		GeoNameID         uint              `maxminddb:"geoname_id"`
		IsInEuropeanUnion bool              `maxminddb:"is_in_european_union"`
		IsoCode           string            `maxminddb:"iso_code"`
		Names             map[string]string `maxminddb:"names"`
	} `maxminddb:"registered_country"`
	RepresentedCountry struct {
		GeoNameID         uint              `maxminddb:"geoname_id"`
		IsInEuropeanUnion bool              `maxminddb:"is_in_european_union"`
		IsoCode           string            `maxminddb:"iso_code"`
		Names             map[string]string `maxminddb:"names"`
		Type              string            `maxminddb:"type"`
	} `maxminddb:"represented_country"`
	Traits struct {
		IsAnonymousProxy    bool `maxminddb:"is_anonymous_proxy"`
		IsSatelliteProvider bool `maxminddb:"is_satellite_provider"`
	} `maxminddb:"traits"`
}

// The AnonymousIP struct corresponds to the data in the GeoIP2
// Anonymous IP database.
type AnonymousIP struct {
	IsAnonymous        bool `maxminddb:"is_anonymous"`
	IsAnonymousVPN     bool `maxminddb:"is_anonymous_vpn"`
	IsHostingProvider  bool `maxminddb:"is_hosting_provider"`
	IsPublicProxy      bool `maxminddb:"is_public_proxy"`
	IsResidentialProxy bool `maxminddb:"is_residential_proxy"`
	IsTorExitNode      bool `maxminddb:"is_tor_exit_node"`
}

// The ASN struct corresponds to the data in the GeoLite2 ASN database.
type ASN struct {
	AutonomousSystemNumber       uint   `maxminddb:"autonomous_system_number"`
	AutonomousSystemOrganization string `maxminddb:"autonomous_system_organization"`
}

// The ConnectionType struct corresponds to the data in the GeoIP2
// Connection-Type database.
type ConnectionType struct {
	ConnectionType string `maxminddb:"connection_type"`
}

// The Domain struct corresponds to the data in the GeoIP2 Domain database.
type Domain struct {
	Domain string `maxminddb:"domain"`
}

// The ISP struct corresponds to the data in the GeoIP2 ISP database.
type ISP struct {
	AutonomousSystemNumber       uint   `maxminddb:"autonomous_system_number"`
	AutonomousSystemOrganization string `maxminddb:"autonomous_system_organization"`
	ISP                          string `maxminddb:"isp"`
	MobileCountryCode            string `maxminddb:"mobile_country_code"`
	MobileNetworkCode            string `maxminddb:"mobile_network_code"`
	Organization                 string `maxminddb:"organization"`
}

type databaseType int
