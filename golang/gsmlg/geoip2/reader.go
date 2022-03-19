// Package geoip2 provides an easy-to-use API for the MaxMind GeoIP2 and
// GeoLite2 databases; this package does not support GeoIP Legacy databases.
//
// The structs provided by this package match the internal structure of
// the data in the MaxMind databases.
package geoip2

import (
	"fmt"
	"net"

	maxminddb "github.com/gsmlg-dev/Foundation/golang/gsmlg/maxminddb"
)

const (
	isAnonymousIP = 1 << iota
	isASN
	isCity
	isConnectionType
	isCountry
	isDomain
	isEnterprise
	isISP
)

// Reader holds the maxminddb.Reader struct. It can be created using the
// Open and FromBytes functions.
type Reader struct {
	mmdbReader   *maxminddb.Reader
	databaseType databaseType
}

// InvalidMethodError is returned when a lookup method is called on a
// database that it does not support. For instance, calling the ISP method
// on a City database.
type InvalidMethodError struct {
	Method       string
	DatabaseType string
}

func (e InvalidMethodError) Error() string {
	return fmt.Sprintf(`geoip2: the %s method does not support the %s database`,
		e.Method, e.DatabaseType)
}

// UnknownDatabaseTypeError is returned when an unknown database type is
// opened.
type UnknownDatabaseTypeError struct {
	DatabaseType string
}

func (e UnknownDatabaseTypeError) Error() string {
	return fmt.Sprintf(`geoip2: reader does not support the "%s" database type`,
		e.DatabaseType)
}

// Open takes a string path to a file and returns a Reader struct or an error.
// The database file is opened using a memory map. Use the Close method on the
// Reader object to return the resources to the system.
func Open(file string) (*Reader, error) {
	reader, err := maxminddb.Open(file)
	if err != nil {
		return nil, err
	}
	dbType, err := getDBType(reader)
	return &Reader{reader, dbType}, err
}

// FromBytes takes a byte slice corresponding to a GeoIP2/GeoLite2 database
// file and returns a Reader struct or an error. Note that the byte slice is
// used directly; any modification of it after opening the database will result
// in errors while reading from the database.
func FromBytes(bytes []byte) (*Reader, error) {
	reader, err := maxminddb.FromBytes(bytes)
	if err != nil {
		return nil, err
	}
	dbType, err := getDBType(reader)
	return &Reader{reader, dbType}, err
}

func getDBType(reader *maxminddb.Reader) (databaseType, error) {
	switch reader.Metadata.DatabaseType {
	case "GeoIP2-Anonymous-IP":
		return isAnonymousIP, nil
	case "DBIP-ASN-Lite (compat=GeoLite2-ASN)",
		"GeoLite2-ASN":
		return isASN, nil
	// We allow City lookups on Country for back compat
	case "DBIP-City-Lite",
		"DBIP-Country-Lite",
		"DBIP-Country",
		"DBIP-Location (compat=City)",
		"GeoLite2-City",
		"GeoIP2-City",
		"GeoIP2-City-Africa",
		"GeoIP2-City-Asia-Pacific",
		"GeoIP2-City-Europe",
		"GeoIP2-City-North-America",
		"GeoIP2-City-South-America",
		"GeoIP2-Precision-City",
		"GeoLite2-Country",
		"GeoIP2-Country":
		return isCity | isCountry, nil
	case "GeoIP2-Connection-Type":
		return isConnectionType, nil
	case "GeoIP2-Domain":
		return isDomain, nil
	case "DBIP-ISP (compat=Enterprise)",
		"DBIP-Location-ISP (compat=Enterprise)",
		"GeoIP2-Enterprise":
		return isEnterprise | isCity | isCountry, nil
	case "GeoIP2-ISP",
		"GeoIP2-Precision-ISP":
		return isISP | isASN, nil
	default:
		return 0, UnknownDatabaseTypeError{reader.Metadata.DatabaseType}
	}
}

// Enterprise takes an IP address as a net.IP struct and returns an Enterprise
// struct and/or an error. This is intended to be used with the GeoIP2
// Enterprise database.
func (r *Reader) Enterprise(ipAddress net.IP) (*Enterprise, error) {
	if isEnterprise&r.databaseType == 0 {
		return nil, InvalidMethodError{"Enterprise", r.Metadata().DatabaseType}
	}
	var enterprise Enterprise
	err := r.mmdbReader.Lookup(ipAddress, &enterprise)
	return &enterprise, err
}

// City takes an IP address as a net.IP struct and returns a City struct
// and/or an error. Although this can be used with other databases, this
// method generally should be used with the GeoIP2 or GeoLite2 City databases.
func (r *Reader) City(ipAddress net.IP) (*City, error) {
	if isCity&r.databaseType == 0 {
		return nil, InvalidMethodError{"City", r.Metadata().DatabaseType}
	}
	var city City
	err := r.mmdbReader.Lookup(ipAddress, &city)
	return &city, err
}

// Country takes an IP address as a net.IP struct and returns a Country struct
// and/or an error. Although this can be used with other databases, this
// method generally should be used with the GeoIP2 or GeoLite2 Country
// databases.
func (r *Reader) Country(ipAddress net.IP) (*Country, error) {
	if isCountry&r.databaseType == 0 {
		return nil, InvalidMethodError{"Country", r.Metadata().DatabaseType}
	}
	var country Country
	err := r.mmdbReader.Lookup(ipAddress, &country)
	return &country, err
}

// AnonymousIP takes an IP address as a net.IP struct and returns a
// AnonymousIP struct and/or an error.
func (r *Reader) AnonymousIP(ipAddress net.IP) (*AnonymousIP, error) {
	if isAnonymousIP&r.databaseType == 0 {
		return nil, InvalidMethodError{"AnonymousIP", r.Metadata().DatabaseType}
	}
	var anonIP AnonymousIP
	err := r.mmdbReader.Lookup(ipAddress, &anonIP)
	return &anonIP, err
}

// ASN takes an IP address as a net.IP struct and returns a ASN struct and/or
// an error
func (r *Reader) ASN(ipAddress net.IP) (*ASN, error) {
	if isASN&r.databaseType == 0 {
		return nil, InvalidMethodError{"ASN", r.Metadata().DatabaseType}
	}
	var val ASN
	err := r.mmdbReader.Lookup(ipAddress, &val)
	return &val, err
}

// ConnectionType takes an IP address as a net.IP struct and returns a
// ConnectionType struct and/or an error
func (r *Reader) ConnectionType(ipAddress net.IP) (*ConnectionType, error) {
	if isConnectionType&r.databaseType == 0 {
		return nil, InvalidMethodError{"ConnectionType", r.Metadata().DatabaseType}
	}
	var val ConnectionType
	err := r.mmdbReader.Lookup(ipAddress, &val)
	return &val, err
}

// Domain takes an IP address as a net.IP struct and returns a
// Domain struct and/or an error
func (r *Reader) Domain(ipAddress net.IP) (*Domain, error) {
	if isDomain&r.databaseType == 0 {
		return nil, InvalidMethodError{"Domain", r.Metadata().DatabaseType}
	}
	var val Domain
	err := r.mmdbReader.Lookup(ipAddress, &val)
	return &val, err
}

// ISP takes an IP address as a net.IP struct and returns a ISP struct and/or
// an error
func (r *Reader) ISP(ipAddress net.IP) (*ISP, error) {
	if isISP&r.databaseType == 0 {
		return nil, InvalidMethodError{"ISP", r.Metadata().DatabaseType}
	}
	var val ISP
	err := r.mmdbReader.Lookup(ipAddress, &val)
	return &val, err
}

// Metadata takes no arguments and returns a struct containing metadata about
// the MaxMind database in use by the Reader.
func (r *Reader) Metadata() maxminddb.Metadata {
	return r.mmdbReader.Metadata
}

// Close unmaps the database file from virtual memory and returns the
// resources to the system.
func (r *Reader) Close() error {
	return r.mmdbReader.Close()
}
