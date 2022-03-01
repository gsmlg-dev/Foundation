package print

import (
	"encoding/json"
	"fmt"
)

func Json(l interface{}) {
	s, err := json.Marshal(l)
	if err != nil {
		fmt.Printf("%v\n", err)
		return
	}
	fmt.Printf("%s\n", s)
}
