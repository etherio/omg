<template>
  <v-container>
    <h2>
      <v-badge
        :color="failed ? 'error' : active ? 'success' : 'warning'"
        bottom
        bordered
        dot
        overlap
       >
        <v-icon>mdi-server</v-icon> 
      </v-badge>
      Server Status
    </h2>
    <v-divider class="mt-2 mb-2" />
    <!-- Total Requested -->
    <v-card>
      <v-card-title>
	Requests
	<v-spacer />
        <v-icon class="pr-2">
	  mdi-router-network
	</v-icon>
      </v-card-title>
      <v-card-subtitle>
        {{ requested }} requests
      </v-card-subtitle>
    </v-card>
    <v-divider class="mt-2 mb-2" />
    <!-- Memory -->
    <v-card>
      <v-card-title>
	RAM
	<v-spacer />
        <v-icon class="pr-2">
	  mdi-memory
	</v-icon>
      </v-card-title>
      <v-card-text>
        <v-simple-table>
	  <tr>
	    <th>Allocated</th>
	    <td>{{ allocated }}</td>
	  </tr>
	  <tr>
	    <th>Used</th>
	    <td>{{ used }}</td>
	  </tr>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import server from "@/app/server";

export default {
  data: () => ({
    loading: true,
    active: false,
    pending: false,
    failed: false,
    requested: null,
    allocated: null,
    used: null,
  }),

  created() {
    this.pending = true,
    this.axios
      .get(server.status)
      .then(({data}) => {
        this.active = true;
        this.pending = this.failed = false;
	this.loading = false;
	this.requested = data.requested;
	this.allocated = data.memory.allocated;
	this.used = data.memory.usage;
      })
      .catch((err) => {
	alert('ERROR:' + err.message);
	this.loading = false;
      });
  }
}
</script>
