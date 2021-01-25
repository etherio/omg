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
	Information
	<v-spacer />
        <v-icon class="pr-2">
	  mdi-router-network
	</v-icon>
      </v-card-title>
      <v-card-subtitle>
        <v-simple-table>
          <tr>
            <th>Requests (times)</th>
            <td>{{ count.toLocaleString() }}</td>
          </tr>
          <tr>
            <th>Uptime ()</th>
            <td>{{ uptime.toLocaleString() }}</td>
          </tr>
          <tr>
            <th>Requested IP</th>
            <td><a :href="`https://ipconfig.io/${ipAddr}`" target="_blank" rel="noreferrer">{{ ipAddr }}</a></td>
          </tr>
        </v-simple-table>
      </v-card-subtitle>
    </v-card>
    <v-divider class="mt-2 mb-2" />
    <!-- Memory -->
    <v-card>
      <v-card-title>
	Memory (RAM)
	<v-spacer />
        <v-icon class="pr-2">
	  mdi-memory
	</v-icon>
      </v-card-title>
      <v-card-text>
        <v-simple-table>
	  <tr>
	    <th>Resident Set Size (RSS)</th>
	    <td>{{ rss.toLocaleString() }}KB</td>
	  </tr>
	  <tr>
	    <th>Heap Total</th>
	    <td>{{ heapTotal.toLocaleString() }}KB</td>
	  </tr>
	  <tr>
	    <th>Heap Used</th>
	    <td>{{ heapUsed.toLocaleString() }}KB</td>
	  </tr>
	  <tr>
	    <th>External</th>
	    <td>{{ external.toLocaleString() }}KB</td>
	  </tr>
        </v-simple-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import server from "@/app/server";

let eid;
let stt;

export default {
  data: () => ({
    loading: true,
    active: false,
    pending: false,
    failed: false,
    ipAddr: null,
    processor: null,
    rss: 0,
    count: 0,
    heapTotal: 0,
    heapUsed: 0,
    uptime: 0,
  }),

  methods: {
    uptimeInterval() {
      try {
        eid = setInterval(() => {
          this.uptime = Math.round((Date.now() - stt) / 1000);
        }, 800);
      } catch(e) {
        console.error(e);
        clearInterval(eid);
        this.uptime = eid = undefined;
      }
    }
  },

  beforeDestroy() {
    if (eid) {
      clearInterval(eid);
      eid = undefined;
    }
  },

  created() {
    this.pending = true,
    this.axios
      .get(server.status)
      .then(({ data }) => {
        this.active = true;
        this.pending = this.failed = this.loading = false;
	this.ipAddr = data.ip;
        this.count = data.count;
        this.processor = null;
        this.rss = data.memory.rss;
        this.external = Math.round(data.memory.external / 1024);
	this.heapTotal = Math.round(data.memory.heapTotal / 1024);
	this.heapUsed = Math.round(data.memory.heapUsed / 1024);
        this.uptime = data.uptime;
        stt = Date.now() - (data.uptime * 1000);
        this.uptimeInterval();
      })
      .catch((err) => {
	this.failed = true;
	this.pending = this.active = this.loading = false;
      });
  }
}
</script>
