package dto
type SalesFunnel struct {
	New         int64 `json:"new"`
	Contacted   int64 `json:"contacted"`
	Qualified   int64 `json:"qualified"`
	Proposal    int64 `json:"proposal"`
	Won         int64 `json:"won"`
	Lost        int64 `json:"lost"`
}

type TopPerformer struct {
	AssignedTo uint  `json:"assignedTo"`
	TotalLeads int64 `json:"totalLeads"`
}