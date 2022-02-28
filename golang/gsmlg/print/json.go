package print

import (
	"encoding/json"
	"fmt"
)

func Json(l []interface{}) error {
	s, err := json.Marshal(l)
	if err != nil {
		return err
	}
	fmt.Printf("%s\n", s)
}
